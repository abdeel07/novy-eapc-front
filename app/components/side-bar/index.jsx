import React from 'react'
import Image from 'next/image';
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Logo from "../../../public/images/logo.png"
import { useRouter } from 'next/navigation';
const SideBar = () => {
    const { collapseSidebar } = useProSidebar(true);
    const router=useRouter();

    const handleMenuItemClick = () => {
      console.log("clicked")
      router.push("/test");
    };
  return (
    <div>
       <Sidebar style={{ height: "100vh" }} collapsed="true">
        <Menu>
          <MenuItem
         
            onClick={() => {
              collapseSidebar(true);
            }}
            style={{ marginBottom: 100 }}
          >
             <Image src={Logo} alt="Promptopia Logo" width={40} height={40} style={{ marginTop: 10,marginRight:20 }}
            className='object-contain'/>
          </MenuItem>

          <MenuItem style={{color:"rgb(255, 6, 126)"}} icon={<HomeOutlinedIcon />}  onClick={handleMenuItemClick}></MenuItem>
          <MenuItem style={{color:"rgb(255, 6, 126)"}} icon={<PeopleOutlinedIcon />}></MenuItem>
          <MenuItem style={{color:"rgb(255, 6, 126)"}} icon={<ContactsOutlinedIcon />}></MenuItem>
          <MenuItem style={{color:"rgb(255, 6, 126)"}} icon={<ReceiptOutlinedIcon />}></MenuItem>
     
          <MenuItem style={{color:"rgb(255, 6, 126)"}} icon={<CalendarTodayOutlinedIcon />}></MenuItem>
        </Menu>
      </Sidebar>
      
    </div>
  )
}

export default SideBar
