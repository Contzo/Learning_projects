"use client";

function Filter() {
  return (
    <div className="border border-primary-800 flex ">
      <button className="px-5 py-2 hover:bg-primary-700">All cabins</button>
      <button className="px-5 py-2 hover:bg-primary-700">
        1&mdash;3 guest
      </button>
      <button className="px-5 py-2 hover:bg-primary-700">
        4&mdash;7 guest
      </button>
      <button className="px-5 py-2 hover:bg-primary-700">
        8&mdash;12 guest
      </button>
    </div>
  );
}

export default Filter;
