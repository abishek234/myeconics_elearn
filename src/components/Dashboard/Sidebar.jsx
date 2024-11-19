
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Sidebar(){
    const Navigate= useNavigate();

    const logout = () => {
      // Clear user data from state or local storage here
      localStorage.clear(); // Example: clearing local storage
      toast.success('Logged out successfully'); 
      // Redirect to login page
      Navigate('/login');
    };
    return(
        <>
         <nav className="nav__mobile flex-column flex-align-center">
    <div className="nav__hamburger flex flex-align-center flex-column flex-justify-center mb-6">
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
    </div>
    <svg width="45" height="145" viewBox="0 0 45 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.71058 88.7499C7.2624 91.2582 6.5 94.1035 6.5 96.9999C6.5 99.8962 7.2624 102.742 8.71058 105.25C10.1588 107.758 12.2417 109.841 14.75 111.289C17.2583 112.737 20.1036 113.5 23 113.5C25.8964 113.5 28.7417 112.737 31.25 111.289C33.7583 109.841 35.8412 107.758 37.2894 105.25C38.7376 102.742 39.5 99.8962 39.5 96.9999C39.5 94.1035 38.7376 91.2582 37.2894 88.7499L32.6806 91.4108C33.6617 93.1101 34.1782 95.0377 34.1782 96.9999C34.1782 98.9621 33.6617 100.89 32.6806 102.589C31.6995 104.288 30.2884 105.699 28.5891 106.681C26.8898 107.662 24.9622 108.178 23 108.178C21.0378 108.178 19.1102 107.662 17.4109 106.681C15.7116 105.699 14.3005 104.288 13.3194 102.589C12.3383 100.89 11.8218 98.9621 11.8218 96.9999C11.8218 95.0377 12.3383 93.1101 13.3194 91.4108L8.71058 88.7499Z"
        fill="#4062FF" />
      <path
        d="M29.2046 103.083C27.5246 104.763 25.4766 105.603 23.0606 105.603C20.6446 105.603 18.5966 104.763 16.9166 103.083C15.2366 101.387 14.3966 99.1553 14.3966 96.3873C14.3966 95.1553 14.5726 94.0833 14.9246 93.1713C15.2766 92.2433 15.8046 91.3073 16.5086 90.3633L19.3406 91.8993C18.2526 93.3233 17.7086 94.8113 17.7086 96.3633C17.7086 98.0273 18.2206 99.3553 19.2446 100.347C20.2526 101.339 21.5246 101.835 23.0606 101.835C24.5966 101.835 25.8766 101.339 26.9006 100.347C27.9086 99.3553 28.4126 98.0273 28.4126 96.3633C28.4126 94.8113 27.8686 93.3233 26.7806 91.8993L29.6126 90.3633C30.3166 91.3073 30.8446 92.2433 31.1966 93.1713C31.5486 94.0833 31.7246 95.1553 31.7246 96.3873C31.7246 99.1553 30.8846 101.387 29.2046 103.083ZM19.1486 84.8592H21.8366C20.8446 84.6832 20.1086 84.2432 19.6286 83.5392C19.1326 82.8352 18.8846 82.1472 18.8846 81.4752C18.8846 81.2032 18.9166 80.8992 18.9806 80.5632H22.5086C22.3966 81.0272 22.3406 81.5312 22.3406 82.0752C22.3406 82.8112 22.5566 83.4432 22.9886 83.9712C23.4046 84.4992 23.9966 84.7632 24.7646 84.7632H31.4606V88.3392H19.1486V84.8592ZM26.8526 73.0184L19.1486 70.0904V66.1544L37.0766 74.1224V77.7224L30.4286 74.9144L19.1486 79.9784V75.9464L26.8526 73.0184ZM25.3406 54.569C24.3166 54.569 23.4686 54.857 22.7966 55.433C22.1246 55.993 21.7886 56.761 21.7886 57.737C21.7886 58.665 22.0846 59.433 22.6766 60.041C23.2686 60.649 24.0926 60.953 25.1486 60.953C26.2846 60.953 27.1806 60.649 27.8366 60.041C28.4926 59.433 28.8206 58.633 28.8206 57.641C28.8206 56.697 28.4926 55.953 27.8366 55.409C27.1646 54.849 26.3326 54.569 25.3406 54.569ZM37.0766 60.857V64.433H19.1486L19.1486 60.857H20.9486C19.5726 59.897 18.8846 58.609 18.8846 56.993C18.8846 55.169 19.5006 53.713 20.7326 52.625C21.9646 51.537 23.5086 50.993 25.3646 50.993C27.1726 50.993 28.6846 51.521 29.9006 52.577C31.1166 53.617 31.7246 55.065 31.7246 56.921C31.7246 57.721 31.5486 58.473 31.1966 59.177C30.8446 59.865 30.3726 60.425 29.7806 60.857H37.0766ZM16.1246 44.4076H19.1486V40.9996H21.9566V44.4076H27.7166C28.4366 44.4076 28.7966 44.1036 28.7966 43.4956C28.7966 42.8716 28.4126 42.5596 27.6446 42.5596C27.2446 42.5596 26.8926 42.6156 26.5886 42.7276V39.8956C26.9886 39.7036 27.4766 39.6076 28.0526 39.6076C29.0606 39.6076 29.9246 39.9516 30.6446 40.6396C31.3646 41.3276 31.7246 42.3516 31.7246 43.7116C31.7246 46.5596 30.2766 47.9836 27.3806 47.9836H21.9566V49.8316H19.1486V47.7196L16.1246 47.1676V44.4076ZM29.9246 36.6074C28.7086 37.9354 27.1646 38.5994 25.2926 38.5994C23.4206 38.5994 21.8846 37.9354 20.6846 36.6074C19.4846 35.2634 18.8846 33.6714 18.8846 31.8314C18.8846 29.9914 19.4926 28.4074 20.7086 27.0794C21.9086 25.7354 23.4366 25.0634 25.2926 25.0634C27.1646 25.0634 28.7086 25.7354 29.9246 27.0794C31.1246 28.4074 31.7246 29.9914 31.7246 31.8314C31.7246 33.6714 31.1246 35.2634 29.9246 36.6074ZM25.2926 35.1194C26.2526 35.1194 27.0526 34.7994 27.6926 34.1594C28.3326 33.5034 28.6526 32.7274 28.6526 31.8314C28.6526 30.9194 28.3326 30.1434 27.6926 29.5034C27.0366 28.8634 26.2366 28.5434 25.2926 28.5434C24.3486 28.5434 23.5566 28.8634 22.9166 29.5034C22.2766 30.1434 21.9566 30.9194 21.9566 31.8314C21.9566 32.7274 22.2766 33.5034 22.9166 34.1594C23.5566 34.7994 24.3486 35.1194 25.2926 35.1194Z"
        fill="black" />
      <path
        d="M19.2446 10.0891C19.9966 10.0891 20.6926 10.3291 21.3326 10.8091C21.9566 11.2731 22.4286 11.9451 22.7486 12.8251C22.9406 11.8331 23.4366 11.0011 24.2366 10.3291C25.0206 9.65712 25.8526 9.32112 26.7326 9.32112C28.1566 9.32112 29.3006 9.87312 30.1646 10.9771C31.0286 12.0651 31.4606 13.4971 31.4606 15.2731L31.4606 22.3051H14.6366L14.6606 15.9931C14.6606 14.2651 15.0766 12.8491 15.9086 11.7451C16.7246 10.6411 17.8366 10.0891 19.2446 10.0891ZM24.3086 16.6411V18.5851H28.5086V15.2731C28.5086 14.6331 28.3406 14.1131 28.0046 13.7131C27.6686 13.2971 27.2206 13.0891 26.6606 13.0891C25.9566 13.0891 25.3886 13.3371 24.9566 13.8331C24.5246 14.3131 24.3086 15.2491 24.3086 16.6411ZM21.7166 18.5851V17.0491C21.7166 14.9211 20.9486 13.8571 19.4126 13.8571C18.8366 13.8571 18.3966 14.0651 18.0926 14.4811C17.7726 14.8811 17.6126 15.3851 17.6126 15.9931V18.5851H21.7166ZM19.1486 3.39049H21.8366C20.8446 3.21449 20.1086 2.77449 19.6286 2.07049C19.1326 1.36649 18.8846 0.678493 18.8846 0.00649357C18.8846 -0.265506 18.9166 -0.569506 18.9806 -0.905506H22.5086C22.3966 -0.441506 22.3406 0.0624936 22.3406 0.606494C22.3406 1.34249 22.5566 1.97449 22.9886 2.50249C23.4046 3.03049 23.9966 3.29449 24.7646 3.29449H31.4606V6.87049H19.1486V3.39049ZM29.9246 -3.84569C28.7086 -2.51769 27.1646 -1.85369 25.2926 -1.85369C23.4206 -1.85369 21.8846 -2.51769 20.6846 -3.84569C19.4846 -5.18969 18.8846 -6.78169 18.8846 -8.62169C18.8846 -10.4617 19.4926 -12.0457 20.7086 -13.3737C21.9086 -14.7177 23.4366 -15.3897 25.2926 -15.3897C27.1646 -15.3897 28.7086 -14.7177 29.9246 -13.3737C31.1246 -12.0457 31.7246 -10.4617 31.7246 -8.62169C31.7246 -6.78169 31.1246 -5.18969 29.9246 -3.84569ZM25.2926 -5.33369C26.2526 -5.33369 27.0526 -5.65369 27.6926 -6.29369C28.3326 -6.94969 28.6526 -7.72569 28.6526 -8.62169C28.6526 -9.53369 28.3326 -10.3097 27.6926 -10.9497C27.0366 -11.5897 26.2366 -11.9097 25.2926 -11.9097C24.3486 -11.9097 23.5566 -11.5897 22.9166 -10.9497C22.2766 -10.3097 21.9566 -9.53369 21.9566 -8.62169C21.9566 -7.72569 22.2766 -6.94969 22.9166 -6.29369C23.5566 -5.65369 24.3486 -5.33369 25.2926 -5.33369Z"
        fill="#4062FF" />
    </svg>
  </nav>
  <nav className="nav flex flex-column">
    <ul className="nav__menus flex flex-column mb-14">
      <img src="https://myeconics.com/wp-content/uploads/2023/04/MyEconics_Logo_FA-02-e1682327971923.png" alt="" height={50} width={50}/>
      <li className="mt-8 mb-3">
        <NavLink to="/dashboard" activeclassname="active-link" className="nav__menu  flex flex-align-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.13478 20.7733V17.7156C9.13478 16.9351 9.77217 16.3023 10.5584 16.3023H13.4326C13.8102 16.3023 14.1723 16.4512 14.4393 16.7163C14.7063 16.9813 14.8563 17.3408 14.8563 17.7156V20.7733C14.8539 21.0978 14.9821 21.4099 15.2124 21.6402C15.4427 21.8705 15.7561 22 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0008C21.1356 20.3588 21.5 19.487 21.5 18.5778V9.86686C21.5 9.13246 21.1721 8.43584 20.6046 7.96467L13.934 2.67587C12.7737 1.74856 11.1111 1.7785 9.98539 2.74698L3.46701 7.96467C2.87274 8.42195 2.51755 9.12064 2.5 9.86686V18.5689C2.5 20.4639 4.04738 22 5.95617 22H7.87229C8.55123 22 9.103 21.4562 9.10792 20.7822L9.13478 20.7733Z"
              fill="black" />
          </svg>
          Dashboard
        </NavLink>
      </li>
      <li className="mb-3">
        <NavLink to="/details" activeclassname="active-link" className="nav__menu flex flex-align-center ">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.3 12.8294C18.5124 12.8294 19.6102 12.8983 20.2855 13.0265C20.296 13.0265 20.9139 13.1536 21.1199 13.2356C21.4172 13.3639 21.6688 13.5955 21.8291 13.8853C21.9438 14.1169 22 14.3616 22 14.617C21.9895 14.883 21.8174 15.3831 21.7367 15.5802C21.2346 16.8797 19.5868 19.3633 18.5815 20.3158C18.4211 20.4774 18.2269 20.652 18.1812 20.6983C17.9284 20.8955 17.6206 21 17.2894 21C16.991 21 16.6937 20.9074 16.4538 20.7209C16.3292 20.6318 16.1473 20.4545 16.0641 20.3715L16.0196 20.3265C14.978 19.3526 13.4121 16.926 12.9089 15.6955C12.8982 15.6955 12.6475 15.0816 12.5968 14.7113L12.5882 14.617V14.5706C12.5882 14.0361 12.8855 13.5373 13.3665 13.2819C13.6298 13.1429 14.3952 13.0147 14.4069 13.0028C15.0927 12.8983 16.1449 12.8294 17.3 12.8294ZM6.70553 12.8905C7.18478 12.8905 7.57926 13.2561 7.63317 13.7277L7.63945 13.8383L7.89575 18.4171C7.89575 19.0846 7.36325 19.625 6.70553 19.625C6.08892 19.625 5.58133 19.15 5.52029 18.5406L5.51414 18.4171L5.77161 13.8383C5.77161 13.3146 6.18942 12.8905 6.70553 12.8905ZM6.71173 3C7.00783 3 7.30509 3.09264 7.54618 3.27793C7.65004 3.35291 7.79368 3.48866 7.88681 3.57993L7.98037 3.67345C9.02079 4.64858 10.5879 7.07394 11.0911 8.30444C11.1007 8.30444 11.3523 8.91922 11.4032 9.28974L11.4118 9.38409V9.43041C11.4118 9.96371 11.1133 10.4626 10.6335 10.7179C10.3702 10.8581 9.60478 10.9852 9.59308 10.997C8.90727 11.1016 7.85514 11.1704 6.70003 11.1704C5.48757 11.1704 4.38981 11.1016 3.71453 10.9733C3.70282 10.9733 3.08606 10.8462 2.88009 10.7642C2.58282 10.6372 2.3312 10.4044 2.17087 10.1145C2.05618 9.88294 2 9.63827 2 9.38409C2.01053 9.11685 2.18257 8.618 2.26215 8.42083C2.76539 7.12026 4.41204 4.6367 5.41852 3.68532C5.57886 3.5226 5.77313 3.34801 5.81877 3.30169C6.07039 3.10452 6.37936 3 6.71173 3ZM17.2947 4.375C17.9113 4.375 18.4179 4.84999 18.4788 5.45938L18.4849 5.58295L18.2286 10.1618C18.2286 10.6856 17.8108 11.1096 17.2947 11.1096C16.8155 11.1096 16.421 10.744 16.3671 10.2724L16.3608 10.1618L16.1033 5.58295C16.1033 4.91543 16.637 4.375 17.2947 4.375Z"
              fill="black" />
          </svg>
          Details
        </NavLink>
      </li>
    
      <li className="mb-3">
        <NavLink to="/view" activeclassname="active-link" className="nav__menu flex flex-align-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.4498 3.7803C15.4098 4.0303 15.3898 4.2803 15.3898 4.5303C15.3898 6.7803 17.2098 8.5993 19.4498 8.5993C19.6998 8.5993 19.9398 8.5703 20.1898 8.5303V16.5993C20.1898 19.9903 18.1898 22.0003 14.7898 22.0003H7.40076C3.99976 22.0003 1.99976 19.9903 1.99976 16.5993V9.2003C1.99976 5.8003 3.99976 3.7803 7.40076 3.7803H15.4498ZM15.6508 9.8603C15.3798 9.8303 15.1108 9.9503 14.9498 10.1703L12.5308 13.3003L9.75976 11.1203C9.58976 10.9903 9.38976 10.9393 9.18975 10.9603C8.99076 10.9903 8.81076 11.0993 8.68975 11.2593L5.73076 15.1103L5.66976 15.2003C5.49976 15.5193 5.57976 15.9293 5.87976 16.1503C6.01976 16.2403 6.16976 16.3003 6.33976 16.3003C6.57076 16.3103 6.78976 16.1893 6.92976 16.0003L9.43975 12.7693L12.2898 14.9103L12.3798 14.9693C12.6998 15.1393 13.0998 15.0603 13.3298 14.7593L16.2198 11.0303L16.1798 11.0503C16.3398 10.8303 16.3698 10.5503 16.2598 10.3003C16.1508 10.0503 15.9098 9.8803 15.6508 9.8603ZM19.5899 2C20.9199 2 21.9999 3.08 21.9999 4.41C21.9999 5.74 20.9199 6.82 19.5899 6.82C18.2599 6.82 17.1799 5.74 17.1799 4.41C17.1799 3.08 18.2599 2 19.5899 2Z"
              fill="black" />
          </svg>
          View
        </NavLink>
      </li>
      {/* <li className="mb-3">
        <a className="nav__menu flex flex-align-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 15.1739C16.3386 15.1739 20 15.8789 20 18.599C20 21.32 16.3146 22 12 22C7.66237 22 4 21.295 4 18.575C4 15.8539 7.68538 15.1739 12 15.1739ZM12 2C14.9391 2 17.294 4.35402 17.294 7.29105C17.294 10.2281 14.9391 12.5831 12 12.5831C9.0619 12.5831 6.70601 10.2281 6.70601 7.29105C6.70601 4.35402 9.0619 2 12 2Z"
              fill="black" />
          </svg>
          Profile
        </a>
      </li>
      <li className="mb-3">
        <a className="nav__menu flex flex-align-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.7171 2.00012C13.4734 2.00012 14.1581 2.42012 14.5362 3.04012C14.7201 3.34012 14.8428 3.71012 14.8121 4.10012C14.7917 4.40012 14.8837 4.70012 15.0472 4.98012C15.5684 5.83012 16.7232 6.15012 17.6225 5.67012C18.6342 5.09012 19.9117 5.44012 20.4942 6.43012L21.1789 7.61012C21.7716 8.60012 21.4446 9.87012 20.4227 10.4401C19.554 10.9501 19.2474 12.0801 19.7686 12.9401C19.9321 13.2101 20.1161 13.4401 20.4022 13.5801C20.7599 13.7701 21.0358 14.0701 21.23 14.3701C21.6081 14.9901 21.5775 15.7501 21.2096 16.4201L20.4942 17.6201C20.1161 18.2601 19.4109 18.6601 18.6853 18.6601C18.3277 18.6601 17.9291 18.5601 17.6021 18.3601C17.3364 18.1901 17.0298 18.1301 16.7027 18.1301C15.691 18.1301 14.8428 18.9601 14.8121 19.9501C14.8121 21.1001 13.8719 22.0001 12.6967 22.0001H11.3068C10.1213 22.0001 9.18113 21.1001 9.18113 19.9501C9.16069 18.9601 8.31247 18.1301 7.30073 18.1301C6.96348 18.1301 6.6569 18.1901 6.40141 18.3601C6.07438 18.5601 5.6656 18.6601 5.31813 18.6601C4.58232 18.6601 3.87717 18.2601 3.49905 17.6201L2.7939 16.4201C2.41577 15.7701 2.39533 14.9901 2.77346 14.3701C2.93697 14.0701 3.24356 13.7701 3.59102 13.5801C3.87717 13.4401 4.06112 13.2101 4.23486 12.9401C4.74584 12.0801 4.43925 10.9501 3.57059 10.4401C2.55885 9.87012 2.23182 8.60012 2.81434 7.61012L3.49905 6.43012C4.09178 5.44012 5.35901 5.09012 6.38097 5.67012C7.27007 6.15012 8.42488 5.83012 8.94608 4.98012C9.10959 4.70012 9.20157 4.40012 9.18113 4.10012C9.16069 3.71012 9.27311 3.34012 9.46728 3.04012C9.8454 2.42012 10.5301 2.02012 11.2761 2.00012H12.7171ZM12.012 9.18012C10.4075 9.18012 9.10959 10.4401 9.10959 12.0101C9.10959 13.5801 10.4075 14.8301 12.012 14.8301C13.6164 14.8301 14.8837 13.5801 14.8837 12.0101C14.8837 10.4401 13.6164 9.18012 12.012 9.18012Z"
              fill="black" />
          </svg>
          Settings
        </a>
      </li> */}
    </ul>
    <ul className="nav__logouts flex flex-column flex-justify-between">
      <li>
        <a className="nav__logout flex flex-align-center" onClick={logout}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.4927 2C13.9753 2 16 3.99 16 6.44V11.23H9.89535C9.45785 11.23 9.11192 11.57 9.11192 12C9.11192 12.42 9.45785 12.77 9.89535 12.77H16V17.55C16 20 13.9753 22 11.4724 22H6.51744C4.02471 22 2 20.01 2 17.56V6.45C2 3.99 4.03488 2 6.52762 2H11.4927ZM18.5402 8.5502C18.8402 8.2402 19.3302 8.2402 19.6302 8.5402L22.5502 11.4502C22.7002 11.6002 22.7802 11.7902 22.7802 12.0002C22.7802 12.2002 22.7002 12.4002 22.5502 12.5402L19.6302 15.4502C19.4802 15.6002 19.2802 15.6802 19.0902 15.6802C18.8902 15.6802 18.6902 15.6002 18.5402 15.4502C18.2402 15.1502 18.2402 14.6602 18.5402 14.3602L20.1402 12.7702H16.0002V11.2302H20.1402L18.5402 9.6402C18.2402 9.3402 18.2402 8.8502 18.5402 8.5502Z"
              fill="black" />
          </svg>
          Logout
        </a>
      </li>
    </ul>
  </nav>
        
        </>
    )
}