import React, { useRef, useState, useEffect } from 'react';
import { patchRing } from '../../api/conventionsApi';
import {Collapse , Button } from 'react-bootstrap';
import './SignatureCanvas.css'

export const SignatureCanvas = ({ convId1, userRole, row,open1, isDisabled = false, setMainLinks, valueRing=25, setOpen }) => {
  // const [open, setOpen] = useState(false);

    if(userRole === 'ROLE_STUDENT' && row.progress >= 25 ){
    isDisabled = true;
  }
  const calculatedValueRing = userRole === 'ROLE_COMMANDER' ? 20 : 100;
  
  const getProgressValue = () => {
    if (userRole === 'ROLE_COMMANDER') return 75;
    if (userRole === 'ROLE_DIRECTOR') return 100;
    if (userRole === 'ROLE_STUDENT') return 25;
  };
  let provalue = getProgressValue();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Защита от null
    
    const ctx = canvas.getContext('2d');
    setContext(ctx);

    canvas.width = 500;
    canvas.height = 300;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Применяем стили в зависимости от isDisabled
    if (isDisabled) {
      canvas.style.cursor = 'not-allowed';
      canvas.style.opacity = '0.6';
      canvas.style.pointerEvents = 'none';
      canvas.style.background = '#f5f5f5';
    } else {
      canvas.style.cursor = 'url("/images/quill.png"), auto';
      canvas.style.opacity = '1';
      canvas.style.pointerEvents = 'auto';
      canvas.style.background = 'white';
    }
  };

  const startDrawing = (e) => {
    if (isDisabled) return; // Блокируем если disabled
    setIsDrawing(true);
    const ctx = context;
    if (!ctx) return; // Защита от null
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsEmpty(false);
  };

  const draw = (e) => {
    if (isDisabled || !isDrawing || !context) return; // Блокируем если disabled
    const ctx = context;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (isDisabled) return; // Блокируем если disabled
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  };

  const saveImage = async () => {
    if (isDisabled) return; // Блокируем если disabled
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL();
    
    console.log('Отправка подписи:', {
      convId: convId1,
      userRole: userRole,
      hasImage: !!dataUrl,
      rowData: row
    });

    try {
      const response = await fetch('http://localhost:8000/save-signature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          image: dataUrl, 
          convId: convId1,
          role: userRole
        }),
      });

      const result = await response.text();
      console.log('Ответ сервера:', response.status, result);
      
      if (response.ok) {
        alert('Signé avec succès!');
        setIsSaved(true);
      } else {
        alert('Erreur: ' + result);
      }
    } catch (error) {
      console.error('Ошибка fetch:', error);
      alert('Erreur de connexion');
    }
  };

  useEffect(() => {
    setupCanvas();
  }, [isDisabled]); // Добавляем isDisabled в зависимости

  return (
    <>
     <Collapse in={open1}>

      <div id="example-collapse-text">
      <span className='sign-here'> Veillez signer ci-dessous: </span>

          <canvas
            ref={canvasRef}
            onMouseDown={isDisabled ? undefined : startDrawing}
            onMouseMove={isDisabled ? undefined : draw}
            onMouseUp={isDisabled ? undefined : stopDrawing}
            onMouseOut={isDisabled ? undefined : stopDrawing}
            style={{ 
              border: '1px solid black', 
              background: isDisabled ? '#f5f5f5' : 'white',
              cursor: isDisabled ? 'not-allowed' : '/images/quill.png',
              opacity: isDisabled ? 0.6 : 1,
              pointerEvents: isDisabled ? 'none' : 'auto'
            }}
          />
      <br />
      <button 
        className="btn btn-success"
        onClick={async () => { 
          if (isEmpty) {
            alert('Vous n\'avez pas signé la convention!');
            return;
          }
          await patchRing(row.id, provalue, setMainLinks); saveImage(); setOpen(!open)
        }}
        disabled={isDisabled}
        style={{ 
          opacity: isDisabled ? 0.6 : 1,
          cursor: isDisabled ? 'not-allowed' : 'pointer'
        }}
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 17V5c0-1.121-.879-2-2-2s-2 .879-2 2v12l2 2l2-2zM16 7h4m-2 12H5a2 2 0 1 1 0-4h4a2 2 0 1 0 0-4H6"/></svg>
      </button>

      <button 
        className="btn btn-danger" 
        onClick={clearCanvas}
        disabled={isDisabled}
        style={{ 
          marginLeft: '10px',
          opacity: isDisabled ? 0.6 : 1,
          cursor: isDisabled ? 'not-allowed' : 'pointer'
        }}
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
      </svg>

      </button>
    </div>
          </Collapse>

    </>
  );
};