import { FaBuilding } from "react-icons/fa";

function Header() {
  return (
    <div className="text-center mb-4">

      <div className="logo-circle mx-auto mb-3">
        <FaBuilding size={45} />
      </div>

      <h2 className="text-white fw-bold">
        United Breweries Limited
      </h2>

      <p className="text-light">
        Contractor Training Portal
      </p>

    </div>
  );
}

export default Header;