import React, { useRef, useState, useEffect } from 'react';
import { patchRing } from '../../api/conventionsApi';
import {Collapse , Button } from 'react-bootstrap';
import { SignBtn, DeleteBtn } from '../SvgIcons/SvgIcons'
import './SignatureCanvas.css'

export const SignatureCanvas = ({ convId1, userRole, row,open1, isDisabled = false, setMainLinks,  setOpen }) => {

  if(userRole === 'ROLE_STUDENT' && row.progress >= 25 ){
    isDisabled = true;
  }

  // const calculatedValueRing = userRole === 'ROLE_COMMANDER' ? 20 : 100;
  
  const getProgressValue = () => {
    if (userRole === 'ROLE_COMMANDER') return 75;
    if (userRole === 'ROLE_DIRECTOR' ) return 100;
    if (userRole === 'ROLE_STUDENT'  ) return 25;
  };

  let provalue = getProgressValue();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return; 
    
    const ctx = canvas.getContext('2d');
    setContext(ctx);

    canvas.width = 250;
    canvas.height = 300;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    if (isDisabled) return; 
    setIsDrawing(true);
    const ctx = context;
    if (!ctx) return; 
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsEmpty(false);
  };

  const draw = (e) => {
    if (isDisabled || !isDrawing || !context) return; 
    const ctx = context;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (isDisabled) return; 
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  };

  const saveImage = async () => {
    if (isDisabled) return; 
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL();
    
    console.log('Envoie de la signature:', {
      convId: convId1,
      userRole: userRole,
      hasImage: !!dataUrl,
      rowData: row
    });

    try {
      const response = await fetch('https://antiquewhite-bee-570664.hostingersite.com/symfony/public/save-signature', {
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
      console.error('Erreur fetch:', error);
      alert('Erreur de connexion');
    }
  };

const handleTouchStart = (e) => {
  if (isDisabled) return;
  const touch = e.touches[0];
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();

  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  context.beginPath();
  context.moveTo(x, y);
  setIsDrawing(true);
  setIsEmpty(false);

  e.preventDefault(); 
};

const handleTouchMove = (e) => {
  if (isDisabled || !isDrawing || !context) return;
  const touch = e.touches[0];
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();

  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  context.lineTo(x, y);
  context.stroke();

  e.preventDefault(); 
};

useEffect(() => {
  setupCanvas();
}, [isDisabled]); 
  
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const opts = { passive: false };
  canvas.addEventListener("touchmove", handleTouchMove, opts);
  
  return () => {
    canvas.removeEventListener("touchmove", handleTouchMove, opts);
  };

}, [handleTouchMove]);

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

                onTouchStart={isDisabled ? undefined : handleTouchStart}
                onTouchMove={isDisabled ? undefined : handleTouchMove}
                onTouchEnd={isDisabled ? undefined : stopDrawing}
                
                style={{ 
                  border: '1px solid black', 
                  background: isDisabled ? '#f5f5f5' : 'white',
                  cursor: isDisabled ? 'not-allowed' : '/images/quill.png',
                  opacity: isDisabled ? 0.6 : 1,
                  pointerEvents: isDisabled ? 'none' : 'auto'
                }}
              />
          <br />

          <Button 
            className="btn btn-success"
            onClick={async () => { 
                      if (isEmpty) {
                        alert('Vous n\'avez pas signé la convention!');
                        return;
                      }
                        await patchRing(row.id, provalue, setMainLinks);
                        saveImage(); 
                        setOpen(!open)
                      }}
            disabled={isDisabled}
            style={{ 
              opacity: isDisabled ? 0.6 : 1,
              cursor: isDisabled ? 'not-allowed' : 'pointer'
            }}
          >
            <SignBtn/>
          </Button>

          <Button 
              className="btn btn-danger" 
              id="btn-danger"
              onClick={clearCanvas}
              disabled={isDisabled}
              style={{ 
                marginLeft: '10px',
                opacity: isDisabled ? 0.6 : 1,
                cursor: isDisabled ? 'not-allowed' : 'pointer'
              }}
          >
            <DeleteBtn />
          </Button>

        </div>
      </Collapse>
    </>
  );

};