interface AccentShapeProps {
  key: string;
  top: string;
  left: string;
  width: string;
  height: string;
  background: string;
  transform: string;
}

export const AccentShape: React.FC<AccentShapeProps> = ({ key, top, left, width, height, background, transform }) => (
  <div
    key={key}
    className="absolute transform transition-all duration-700 ease-in-out"
    style={{
      top,
      left,
      width,
      height,
      background,
      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      transform,
    }}
  />
); 