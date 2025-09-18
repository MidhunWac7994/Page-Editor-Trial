

const EmptyState = ({
  message = 'No sections available. Click a "+" to start.',
}) => {
  return <p className="text-center text-gray-400 italic">{message}</p>;
};

export default EmptyState;
