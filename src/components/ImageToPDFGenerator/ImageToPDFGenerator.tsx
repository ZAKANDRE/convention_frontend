import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const CanvasSignaturePDF = () => {
  const [images, setImages] = useState([]);
  const [signatureData, setSignatureData] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const signatureCanvasRef = useRef(null);
  const pdfRef = useRef(null);

  // Инициализация canvas для подписи
  useEffect(() => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000000';
  }, []);

  // Функции для рисования подписи
  const startDrawing = (e) => {
    const canvas = signatureCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = signatureCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    ctx.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Сохранение подписи с canvas
  const saveSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      // Проверяем, есть ли что-то нарисованное
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let isEmpty = true;
      
      for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] !== 0) { // Проверяем альфа-канал
          isEmpty = false;
          break;
        }
      }
      
      if (!isEmpty) {
        const signatureDataURL = canvas.toDataURL('image/png');
        setSignatureData(signatureDataURL);
      } else {
        alert('Пожалуйста, нарисуйте подпись сначала');
      }
    }
  };

  // Очистка подписи
  const clearSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setSignatureData(null);
    }
  };

  // Добавление изображений
  const addImage = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages(prev => [...prev, {
            id: Date.now() + Math.random(),
            src: e.target.result,
            caption: ''
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  // Обновление подписи к изображению
  const updateCaption = (id, caption) => {
    setImages(prev => 
      prev.map(img => 
        img.id === id ? { ...img, caption } : img
      )
    );
  };

  // Генерация PDF с нарисованной подписью
  const generatePDF = async () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;

      // Заголовок
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Документ с подписью', pageWidth / 2, margin, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Дата: ${new Date().toLocaleDateString()}`, pageWidth / 2, margin + 10, { align: 'center' });

      let currentY = margin + 25;

      // Добавляем изображения
      for (const image of images) {
        if (currentY > pageHeight - 150) {
          pdf.addPage();
          currentY = margin;
        }

        try {
          const img = new Image();
          img.src = image.src;
          
          await new Promise((resolve) => {
            img.onload = resolve;
          });

          // Рассчитываем размеры
          const maxWidth = pageWidth - 2 * margin;
          const maxHeight = 150;
          let imgWidth = img.width;
          let imgHeight = img.height;

          if (imgWidth > maxWidth) {
            const ratio = maxWidth / imgWidth;
            imgWidth = maxWidth;
            imgHeight = imgHeight * ratio;
          }

          if (imgHeight > maxHeight) {
            const ratio = maxHeight / imgHeight;
            imgHeight = maxHeight;
            imgWidth = imgWidth * ratio;
          }

          // Добавляем изображение в PDF
          pdf.addImage(image.src, 'JPEG', margin, currentY, imgWidth, imgHeight);
          
          // Подпись к изображению
          if (image.caption) {
            pdf.setFontSize(10);
            pdf.text(image.caption, margin, currentY + imgHeight + 10);
          }

          currentY += imgHeight + 30;
        } catch (error) {
          console.error('Ошибка добавления изображения:', error);
        }
      }

      // Добавляем НАРИСОВАННУЮ подпись в PDF
      if (signatureData) {
        if (currentY > pageHeight - 80) {
          pdf.addPage();
          currentY = margin;
        }

        // Добавляем подпись как изображение
        pdf.addImage(signatureData, 'PNG', margin, currentY, 80, 40);
        
        // Линия и текст
        pdf.setDrawColor(0);
        pdf.line(margin, currentY + 45, margin + 80, currentY + 45);
        
        pdf.setFontSize(10);
        pdf.text('Подпись:', margin, currentY + 55);
        pdf.text(`Дата: ${new Date().toLocaleDateString()}`, margin, currentY + 65);
      }

      // Сохраняем PDF
      pdf.save('document-with-canvas-signature.pdf');

    } catch (error) {
      console.error('Ошибка генерации PDF:', error);
      alert('Ошибка при создании PDF. Попробуйте снова.');
    }
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>PDF с нарисованной подписью</h1>
      
      {/* Управление */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '10px',
        border: '1px solid #dee2e6'
      }}>
        <h3>📁 Добавить изображения</h3>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={addImage}
          style={{ 
            marginBottom: '20px', 
            padding: '10px',
            border: '2px dashed #007bff',
            borderRadius: '5px',
            width: '100%'
          }}
        />
        
        <h3>✍️ Нарисовать подпись</h3>
        <div style={{ 
          border: '2px dashed #28a745', 
          borderRadius: '8px', 
          padding: '15px',
          backgroundColor: 'white',
          marginBottom: '15px'
        }}>
          <canvas
            ref={signatureCanvasRef}
            width={400}
            height={200}
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: 'white',
              cursor: 'crosshair',
              display: 'block',
              margin: '0 auto'
            }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={(e) => {
              e.preventDefault();
              startDrawing(e.touches[0]);
            }}
            onTouchMove={(e) => {
              e.preventDefault();
              draw(e.touches[0]);
            }}
            onTouchEnd={stopDrawing}
          />
          
          <p style={{ 
            textAlign: 'center', 
            color: '#666', 
            fontSize: '12px', 
            marginTop: '10px' 
          }}>
            Нарисуйте вашу подпись мышью или пальцем
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={saveSignature}
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            💾 Сохранить подпись
          </button>
          
          <button
            onClick={clearSignature}
            style={{
              padding: '12px 24px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🗑️ Очистить
          </button>
        </div>

        {signatureData && (
          <div style={{ 
            marginTop: '15px', 
            padding: '10px', 
            backgroundColor: '#d4edda', 
            borderRadius: '5px',
            border: '1px solid #c3e6cb',
            textAlign: 'center'
          }}>
            <p style={{ color: '#155724', margin: '0 0 10px 0' }}>
              ✅ Подпись сохранена
            </p>
            <img 
              src={signatureData} 
              alt="Предпросмотр подписи" 
              style={{ 
                maxWidth: '100px', 
                maxHeight: '50px',
                border: '1px solid #ddd'
              }}
            />
          </div>
        )}
      </div>

      {/* Предпросмотр содержимого */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#fff3cd', 
        borderRadius: '10px',
        border: '1px solid #ffeaa7'
      }}>
        <h3>📋 Содержимое документа:</h3>
        
        {images.length === 0 ? (
          <p style={{ color: '#856404' }}>Нет добавленных изображений</p>
        ) : (
          <div>
            <p>Изображений: {images.length}</p>
            {images.map((image, index) => (
              <div key={image.id} style={{ 
                marginBottom: '15px', 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '5px',
                border: '1px solid #ddd',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <img 
                  src={image.src} 
                  alt={`Preview ${index + 1}`}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <strong>Изображение {index + 1}</strong>
                  {image.caption && <div>Описание: {image.caption}</div>}
                  <input
                    type="text"
                    placeholder="Добавить описание..."
                    value={image.caption}
                    onChange={(e) => updateCaption(image.id, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '5px',
                      marginTop: '5px',
                      border: '1px solid #ccc',
                      borderRadius: '3px'
                    }}
                  />
                </div>
                <button
                  onClick={() => removeImage(image.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}

        {signatureData && (
          <div style={{ 
            marginTop: '15px', 
            padding: '10px', 
            backgroundColor: 'white', 
            borderRadius: '5px',
            border: '1px solid #ddd',
            textAlign: 'center'
          }}>
            <strong>Нарисованная подпись:</strong>
            <img 
              src={signatureData} 
              alt="Подпись" 
              style={{ 
                display: 'block',
                margin: '10px auto',
                maxWidth: '150px',
                maxHeight: '60px',
                border: '1px solid #ddd'
              }}
            />
          </div>
        )}
      </div>

      {/* Кнопка генерации PDF */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={generatePDF}
          disabled={images.length === 0 && !signatureData}
          style={{
            padding: '15px 40px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: (images.length === 0 && !signatureData) ? 'not-allowed' : 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            opacity: (images.length === 0 && !signatureData) ? 0.6 : 1,
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            if (!(images.length === 0 && !signatureData)) {
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseOut={(e) => {
            if (!(images.length === 0 && !signatureData)) {
              e.target.style.transform = 'scale(1)';
            }
          }}
        >
          📄 Сгенерировать PDF с подписью
        </button>
        
        {(images.length === 0 && !signatureData) && (
          <p style={{ color: '#6c757d', marginTop: '10px' }}>
            Добавьте изображения или нарисуйте подпись
          </p>
        )}
      </div>
    </div>
  );
};

export default CanvasSignaturePDF;