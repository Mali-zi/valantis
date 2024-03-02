import BrandSearch from './BrandSearch';
import FilterClean from './FilterClean';
import PriceSearch from './PriceSearch';
import ProductSearch from './ProductSearch';

export default function SideBar() {
  return (
    <div className="side-bar">
      <ProductSearch />
      <BrandSearch />
      <PriceSearch />
      <FilterClean />
    </div>
  );
}
