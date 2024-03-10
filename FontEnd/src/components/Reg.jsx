import React, { useState } from "react";

const USER_TYPES = ["judge", "lawyer", "visitor"];

function Reg() {
  const [userType, setUserType] = useState("judge");

  return (
    <section>
      <nav>
        <menu>
          {USER_TYPES.map((t) => (
            <li key={t} onClick={() => setUserType(t)}>
              {t}
            </li>
          ))}
        </menu>
      </nav>
    </section>
  );
}

export default Reg;
