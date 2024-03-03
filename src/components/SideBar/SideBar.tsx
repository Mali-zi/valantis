import FilterClean from './FilterClean';
import SearchComponent from './SearchComponent';

export default function SideBar() {
  const fields = [
    { name: 'product', title: 'названию', text: 'название' },
    { name: 'brand', title: 'бренду', text: 'бренд' },
    { name: 'price', title: 'цене', text: 'цену' },
  ];

  return (
    <div className="side-bar">
      <ul className="md:mt-12 mt-2">
        {fields.map((field) => {
          return (
            <li key={field.name} className="md:mt-12 mt-2 w-full h-24">
              <SearchComponent
                name={field.name}
                title={field.title}
                text={field.text}
              />
            </li>
          );
        })}
      </ul>
      <FilterClean />
    </div>
  );
}
