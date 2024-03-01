import BrandSearch from './BrandSearch';
import FilterClean from './FilterClean';
import ProductSearch from './ProductSearch';

export default function SideBar() {
  return (
    <div className="flex flex-col items-center justify-start py-2 bg-blue-600 w-[450px] text-white">
      <ProductSearch />
      <hr />
      <BrandSearch />
      <hr />
      <FilterClean />
    </div>
  );
}
