import styles from '../styles/ownerHistoryDash.module.css';

export default function O_MonthlyBreakdown(props) {

  return (
    <div className={styles.monthly_breakdown_container}>
        <div className={styles.mb_annual_revenue_container}>
            <div className={styles.mb_ar_title}>Monthly Revenue</div>
            <div className={styles.mb_ar_data}> +$360.00</div>
        </div>
        <div className={styles.mb_occupancy_percentage_container}>
            <div className={styles.mb_op_title}> Occupancy %</div>
            <div className={styles.mb_op_data}>TBD</div>
        </div>
    </div>
  )
}