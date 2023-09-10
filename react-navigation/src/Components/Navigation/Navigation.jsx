import React ,{useState}from "react";
import Navbar from "./Navbar";
import { routes } from "../../constant";
import Drawer from "./Drawer";

const Navigation = () => {
const [isOpen,SetIsOpen]=useState(false);

const toggleDrawer = () => {
  SetIsOpen(!isOpen);
}
  console.log(routes);
  return (
    <div>
<Drawer routes={routes} isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <Navbar routes={routes} toggleDrawer={toggleDrawer}/>
    </div>
  );
};
export default Navigation;
