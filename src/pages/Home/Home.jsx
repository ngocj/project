import {Sidebar} from '../../component/layout/sidebar';
import {Header} from '../../component/layout/Header';
import { Outlet } from 'react-router-dom';
export const Home = () => {
    return (
        <div className="row">
            <div className="col-2">
                <Sidebar/>
            </div>
            <div className="col-10">
                <Header />
                <Outlet/>
            </div>
        </div>
    )
}