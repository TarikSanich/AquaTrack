import css from '../WaterDetailedInfo/WaterDetailedInfo.module.css';
import UserPanel from '../../components/UserPanel/UserPanel';
import DailyInfo from '../../components/DailyInfo/DailyInfo';
import MonthInfo from '../../components/MonthInfo/MonthInfo';

export default function WaterDetailedInfo() {
  return (
    <div>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </div>
  );
}