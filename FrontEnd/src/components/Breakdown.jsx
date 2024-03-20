import Wrapper from "../assets/stylingWrappers/Breakdown";
import Arrow from "./Arrow";
import BreakdownForm from "./BreakdownForm";
import { PieChart } from "@mui/x-charts/PieChart";

function Breakdown() {
  return (
    <Wrapper>
      <section className="breakdown-form">
        <h3 className="title">Breakdown</h3>
        <BreakdownForm />
      </section>
      <section className="breakdown-result">
        <Arrow />
        <div className="title">Breakdown cases according to their status</div>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 20, label: "Pending", color: "#f4b678" },
                { id: 1, value: 20, label: "Active", color: "#ef9234" },
                { id: 2, value: 20, label: "Dismissed", color: "#ec7a08" },
                { id: 3, value: 20, label: "Settled", color: "#c46100" },
                { id: 4, value: 20, label: "Appealed", color: "#8f4700" },
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
    </Wrapper>
  );
}

export default Breakdown;
