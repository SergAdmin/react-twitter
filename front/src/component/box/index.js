import "./index.css";

export default function Component({ children, className, style = {} }) {
  // console.log("box", children);
  return (
    <div style={style} className={`box ${className}`}>
      {children}
    </div>
  );
}
