import styles from '../styles/ownerHistoryDash.module.css';

export default function O_MonthlyBreakdown(props) {

  return (
    <div className="monthly-breakdown-container">
        <div className="mb-annual-revenue-container">
            <div className="mb-ar-title">Monthly Revenue</div>
            <div className="mb-ar-data"> +$360.00</div>
        </div>
        <div className="mb-occupancy-percentage-container">
            <div className="mb-op-title"> Occupancy %</div>
            <div className="mb-op-data">TBD</div>
        </div>
    </div>
  )
}