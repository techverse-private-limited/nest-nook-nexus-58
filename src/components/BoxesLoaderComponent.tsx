
export const BoxesLoaderComponent = () => {
  return (
    <div 
      className="flex justify-center items-center" 
      style={{ marginBottom: "20px" }}
    >
      <div className="grid grid-cols-3 gap-1 w-32 h-32 md:w-20 md:h-20">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 md:w-6 md:h-6 rounded-sm animate-pulse"
            style={{ 
              backgroundColor: "hsl(25, 40%, 25%)",
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1.5s"
            }}
          />
        ))}
      </div>
    </div>
  );
};
