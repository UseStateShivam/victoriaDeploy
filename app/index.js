import Link from 'next/link';
import boxes from './data/boxes';

const HomePage = () => {
  return (
    <div>
      {Object.keys(boxes).map((key) => (
        <div key={key}>
          <Link href={`/admin/${key}`}>
            <a>Show Box {key.toUpperCase()}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
