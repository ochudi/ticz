import React from "react";

const ComingSoon = ({ page }: { page: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white text-center p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#24A0B5] font-jeju">
        {page} - Coming Soon
      </h1>
      <p className="mt-4 text-3xl sm:text-xl text-gray-300 max-w-lg font-jeju">
        Our designer is taking their sweet time... probably debating between
        &apos;Helvetica or Inter&apos; 😅. But don&apos;t worry, <strong>{page}</strong> is
        on the way!
      </p>
      <p className="mt-2 text-gray-400 font-jeju">
        Meanwhile, grab a coffee ☕ and stay tuned!
      </p>
    </div>
  );
};

export default ComingSoon;
