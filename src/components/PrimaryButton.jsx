const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  disabled = false
}) => {

  return (

    <button
      className="primary-btn"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >

      {children}

    </button>

  );

};

export default PrimaryButton;