function EmployeeCard({ employee }) {

  if (!employee) return null;

  return (

    <div className="card mt-4 shadow">

      <div className="card-body">

        <h5 className="text-primary">
          Employee Details
        </h5>

        <hr />

        <p>
          <strong>Employee ID :</strong> {employee.id}
        </p>

        <p>
          <strong>Employee Name :</strong> {employee.name}
        </p>

      </div>

    </div>

  );

}

export default EmployeeCard;