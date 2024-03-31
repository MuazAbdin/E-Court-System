import Wrapper from "../assets/stylingWrappers/Breakdown";
import Arrow from "./Arrow";
import BreakdownForm from "./BreakdownForm";
import { PieChart } from "@mui/x-charts/PieChart";

function Breakdown({ counter, total }) {
  return (
    <Wrapper>
      <section className="breakdown-form">
        <h3 className="title">Breakdown</h3>
        <BreakdownForm
          method="POST"
          formID="breakdown-form"
          buttonText="show results"
        />
      </section>
      {total > 0 && (
        <section className="breakdown-result">
          <Arrow />
          <div className="title">Breakdown cases according to their status</div>

          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    // value: (counter["Pending"] / total).toFixed(2) * 100,
                    value: counter["Pending"],
                    label: "Pending",
                    color: "#f4b678",
                  },
                  {
                    id: 1,
                    // value: (counter["Active"] / total).toFixed(2) * 100,
                    value: counter["Active"],
                    label: "Active",
                    color: "#ef9234",
                  },
                  {
                    id: 2,
                    // value: (counter["Dismissed"] / total).toFixed(2) * 100,
                    value: counter["Dismissed"],
                    label: "Dismissed",
                    color: "#ec7a08",
                  },
                  {
                    id: 3,
                    // value: (counter["Settled"] / total).toFixed(2) * 100,
                    value: counter["Settled"],
                    label: "Settled",
                    color: "#c46100",
                  },
                  {
                    id: 4,
                    // value: (counter["Appealed"] / total).toFixed(2) * 100,
                    value: counter["Appealed"],
                    label: "Appealed",
                    color: "#8f4700",
                  },
                ],
                innerRadius: 20,
                outerRadius: 100,
                paddingAngle: 3,
                cornerRadius: 3,
                startAngle: 0,
                endAngle: 360,
                cx: 150,
                cy: 150,
              },
            ]}
            width={400}
            height={275}
          />
        </section>
      )}
    </Wrapper>
  );
}

export default Breakdown;
