export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex border border-[#a5a3a3] rounded shadow text-sm font-medium overflow-x-auto text-nowrap">
        
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 min-w-[60px] h-[74px] border-r  border-[#a5a3a3] ${
            currentPage === 1
              ? "text-[#BDBDBD] bg-[#f0f0f0] cursor-not-allowed font-bold"
              : "text-[#00aaff] hover:bg-[#f0faff]"
          }`}
        >
          First
        </button>

        {currentPage > 2 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-4 py-2 min-w-[46px] border-r border-[#a5a3a3] bg-white text-[#00aaff] hover:bg-[#f0faff]"
            >
              1
            </button>
            <span className="flex justify-center items-center px-3 py-2 min-w-[46px] border-r border-[#a5a3a3] text-gray-400 bg-white">
              ...
            </span>
          </>
        )}

     
        <button
          disabled
          className="px-4 py-2 min-w-[46px] border-r border-[#a5a3a3] bg-[#00aaff] text-white font-bold"
        >
          {currentPage}
        </button>

      
        {currentPage < totalPages - 1 && (
          <>
            <span className="flex justify-center items-center px-3 py-2  min-w-[46px] border-r border-[#a5a3a3] text-gray-400 bg-white">
              ...
            </span>
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-4 py-2 min-w-[46px] border-r border-[#a5a3a3] bg-white text-[#00aaff] hover:bg-[#f0faff]"
            >
              {totalPages}
            </button>
          </>
        )}

       
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 min-w-[60px] ${
            currentPage === totalPages
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-[#00aaff] hover:bg-[#f0faff]"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}