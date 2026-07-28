import Navbar from "../components/Navbar";
import Header from "../components/Header";
import TrainingForm from "../components/TrainingForm";
import Footer from "../components/Footer";

function Home() {

  return (

    <>

      <Navbar />

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="card-glass p-4">

              <Header />

              <TrainingForm />

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>

  );

}

export default Home;