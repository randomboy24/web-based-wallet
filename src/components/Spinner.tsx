export const Spinner = () => {
  return (
    <div
      className="relative w-[70.4px] h-[70.4px] animate-spinner"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="absolute w-full h-full"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '3.5px solid rgb(255, 255, 255)',
          transform: 'translateZ(-35.2px) rotateY(180deg)',
        }}
      ></div>
      <div
        className="absolute w-full h-full"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '3.5px solid rgb(255, 255, 255)',
          transform: 'rotateY(-270deg) translateX(50%)',
          transformOrigin: 'top right',
        }}
      ></div>
      <div
        className="absolute w-full h-full"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '3.5px solid rgb(255, 255, 255)',
          transform: 'rotateY(270deg) translateX(-50%)',
          transformOrigin: 'center left',
        }}
      ></div>
      <div
        className="absolute w-full h-full"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '3.5px solid rgb(255, 255, 255)',
          transform: 'rotateX(90deg) translateY(-50%)',
          transformOrigin: 'top center',
        }}
      ></div>
      <div
        className="absolute w-full h-full"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '3.5px solid rgb(255, 255, 255)',
          transform: 'rotateX(-90deg) translateY(50%)',
          transformOrigin: 'bottom center',
        }}
      ></div>
      <div
        className="absolute w-full h-full"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '3.5px solid rgb(255, 255, 255)',
          transform: 'translateZ(35.2px)',
        }}
      ></div>
    </div>
  );
};
