import MultiAxialLineChart from "../ui/MultiAxialLineChart";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currYear = new Date().getFullYear();
const currMonth = new Date().getMonth() + 1;

function AnalyticsPage() {
  return (
    <>
      <div>
        <h1>Yearly Expense Graph</h1>
        <label htmlFor="">Select Year:</label>
        <input
          type="number"
          max={currYear}
          defaultValue={currYear}
          min={currYear - 10}
        />
        <button>Load</button>
        <MultiAxialLineChart />
      </div>
      <div>
        <h1>Monthly Expense Report</h1>
        <label htmlFor="">Select Year:</label>
        <input
          type="number"
          max={currYear}
          defaultValue={currYear}
          min={currYear - 10}
        />
        <label htmlFor="">Select Month:</label>
        <select defaultValue={currMonth}>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
        <button>Load</button>
        <MultiAxialLineChart />
      </div>
      <div>
        <h1>Total Expense Report</h1>
        <label htmlFor="">Select Year:</label>
        <input
          type="number"
          max={currYear}
          defaultValue={currYear}
          min={currYear - 10}
        />
        <button>Load</button>
        <MultiAxialLineChart />
      </div>
      <div>
        <h1>Ai Summary</h1>
        <label htmlFor="">Select Year:</label>
        <input
          type="number"
          max={currYear}
          defaultValue={currYear}
          min={currYear - 10}
        />
        <button>Load</button>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
          tempora, aut pariatur fugiat quam cum est quae eveniet doloribus
          excepturi consequuntur quod, delectus, magnam quo facere officia ab
          debitis cupiditate.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae
          dolor repellat quo, mollitia asperiores quibusdam tenetur laborum,
          sint id sed eveniet voluptatum magnam debitis nobis hic perferendis
          sequi quasi magni?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita iste
          accusantium odit aliquid vero blanditiis sit sunt qui, beatae labore
          numquam aut quidem amet consequatur. Fugit, assumenda cum! Eius,
          facere!
        </p>
      </div>
    </>
  );
}

export default AnalyticsPage;
