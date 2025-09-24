import './Card.css';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'medium'
}) => {
  const cardClass = `card card-${padding} ${hover ? 'card-hover' : ''} ${className}`;

  return (
    <div className={cardClass}>
      {children}
    </div>
  );
};

export default Card;