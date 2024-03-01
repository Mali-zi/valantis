import BrandSearch from './BrandSearch';
import FilterClean from './FilterClean';
import PriceSearch from './PriceSearch';
import ProductSearch from './ProductSearch';

export default function SideBar() {
  return (
    <div className="flex flex-col items-stretch justify-start px-4 bg-blue-600 w-[25rem] text-white">
      <ProductSearch />
      <BrandSearch />
      <PriceSearch />
      <FilterClean />
    </div>
  );
}
