'use client';

import { useState, useRef, useEffect } from 'react';
// @ts-expect-error - Force ESM import to avoid Webpack CJS/ESM mismatch
import { Stage, Layer, Image as KonvaImage, Text, Transformer } from 'react-konva/es/ReactKonva.js';

// Custom useImage hook to avoid external dependency issues
const useImage = (url: string, crossOrigin?: string) => {
  const [image, setImage] = useState<HTMLImageElement | undefined>();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!url) return;
    const img = new window.Image();
    img.onload = () => {
      setImage(img);
      setStatus('loaded');
    };
    img.onerror = () => {
      setImage(undefined);
      setStatus('failed');
    };
    if (crossOrigin) img.crossOrigin = crossOrigin;
    img.src = url;
  }, [url, crossOrigin]);

  return [image, status];
};

// Types
export type DesignElement = {
  id: string;
  type: 'text' | 'logo';
  view: 'front' | 'back';
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  // Text specific
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  // Logo specific
  src?: string;
};

interface DesignCanvasProps {
  elements: DesignElement[];
  setElements?: React.Dispatch<React.SetStateAction<DesignElement[]>>;
  selectedId?: string | null;
  setSelectedId?: (id: string | null) => void;
  clothingType: 'tshirt' | 'hoodie' | 'jersey';
  view: 'front' | 'back';
  clothingColor: string;
  readOnly?: boolean;
}

// Helper component for loading images
const URLImage = ({ shapeProps, isSelected, onSelect, onChange, draggable }: any) => {
  const [img] = useImage(shapeProps.src, 'anonymous');
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        image={img}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable={draggable}
        onDragEnd={(e: any) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e: any) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox: any, newBox: any) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

// Helper component for Text
const EditableText = ({ shapeProps, isSelected, onSelect, onChange, draggable }: any) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  const resolveFontFamily = (fontFamily: string) => {
    if (!fontFamily || !fontFamily.startsWith('var(')) return fontFamily;
    if (typeof window === 'undefined') return fontFamily;
    
    const varName = fontFamily.replace('var(', '').replace(')', '').trim();
    const resolved = getComputedStyle(document.documentElement).getPropertyValue(varName);
    return resolved ? resolved.trim() : fontFamily;
  };

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        fontFamily={resolveFontFamily(shapeProps.fontFamily)}
        draggable={draggable}
        onDragEnd={(e: any) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e: any) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            fontSize: Math.max(12, (shapeProps.fontSize || 24) * scaleX),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          boundBoxFunc={(oldBox: any, newBox: any) => {
            if (newBox.width < 10 || newBox.height < 10) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default function DesignCanvas({
  elements,
  setElements,
  selectedId,
  setSelectedId,
  clothingType,
  view,
  clothingColor,
  readOnly = false
}: DesignCanvasProps) {
  
  const checkDeselect = (e: any) => {
    if (readOnly || !setSelectedId) return;
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  // Simple SVG paths for clothing
  const getClothingPath = () => {
    if (clothingType === 'tshirt') {
      return "M 120 50 Q 200 90 280 50 L 370 110 Q 380 120 370 130 L 330 180 Q 320 190 310 180 L 300 160 L 300 460 Q 300 470 290 470 L 110 470 Q 100 470 100 460 L 100 160 L 90 180 Q 80 190 70 180 L 30 130 Q 20 120 30 110 Z";
    } else if (clothingType === 'hoodie') {
      return "M 150 30 Q 200 10 250 30 L 280 60 L 380 120 Q 390 130 380 140 L 340 190 Q 330 200 320 190 L 310 170 L 310 460 Q 310 470 300 470 L 100 470 Q 90 470 90 460 L 90 170 L 80 190 Q 70 200 60 190 L 20 140 Q 10 130 20 120 L 120 60 Z";
    } else {
      // jersey (sleeveless)
      return "M 130 50 Q 200 90 270 50 Q 290 50 290 70 L 290 120 Q 280 160 300 200 L 300 460 Q 300 470 290 470 L 110 470 Q 100 470 100 460 L 100 200 Q 120 160 110 120 L 110 70 Q 110 50 130 50 Z";
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Clothing Background (SVG) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-75 md:scale-100 origin-center">
        <svg width="400" height="500" viewBox="0 0 400 500" className="drop-shadow-xl transition-all duration-300">
          <path 
            d={getClothingPath()} 
            fill={clothingColor} 
            stroke="rgba(0,0,0,0.1)" 
            strokeWidth="2"
            className="transition-colors duration-300"
          />
          {/* Add some details based on view */}
          {view === 'front' && clothingType === 'tshirt' && (
            <path d="M 120 50 Q 200 110 280 50" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
          )}
          {view === 'front' && clothingType === 'hoodie' && (
            <>
              <path d="M 150 30 Q 200 60 250 30" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
              <path d="M 150 350 L 250 350 L 280 420 L 120 420 Z" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
              <path d="M 180 60 L 180 150 M 220 60 L 220 150" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="3" strokeDasharray="4 4" />
            </>
          )}
          {view === 'front' && clothingType === 'jersey' && (
            <path d="M 130 50 Q 200 120 270 50" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
          )}
          {view === 'back' && (
            <path d="M 140 50 Q 200 60 260 50" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
          )}
        </svg>
      </div>

      {/* Interactive Canvas */}
      <div className="absolute inset-0 flex items-center justify-center scale-75 md:scale-100 origin-center">
        <div className="w-[400px] h-[500px] border border-transparent hover:border-slate-200 transition-colors relative z-10">
          <Stage
            width={400}
            height={500}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
          >
            <Layer>
              {elements.map((el, originalIndex) => {
                if (el.view !== view) return null;

                if (el.type === 'text') {
                  return (
                    <EditableText
                      key={el.id}
                      shapeProps={el}
                      isSelected={!readOnly && el.id === selectedId}
                      onSelect={() => !readOnly && setSelectedId && setSelectedId(el.id)}
                      draggable={!readOnly}
                      onChange={(newProps: any) => {
                        if (readOnly || !setElements) return;
                        const newElements = elements.slice();
                        newElements[originalIndex] = newProps;
                        setElements(newElements);
                      }}
                    />
                  );
                }
                if (el.type === 'logo') {
                  return (
                    <URLImage
                      key={el.id}
                      shapeProps={el}
                      isSelected={!readOnly && el.id === selectedId}
                      onSelect={() => !readOnly && setSelectedId && setSelectedId(el.id)}
                      draggable={!readOnly}
                      onChange={(newProps: any) => {
                        if (readOnly || !setElements) return;
                        const newElements = elements.slice();
                        newElements[originalIndex] = newProps;
                        setElements(newElements);
                      }}
                    />
                  );
                }
                return null;
              })}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
}
