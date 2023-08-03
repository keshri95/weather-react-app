export const Divider = ({ children }) => {
    return (
      <div className="wrapper">
        <div className="wrapper-border" />
        <span className="content">
          {children}
        </span>
        <div className="wrapper-border" />
      </div>
    );
  };
