import styles from '../styles/ownerHistoryDash.module.css';

export default function O_MonthlyBreakdown(props) {

  console.log('monthly breakdown props: ', props)
  let occupancy;
  let total;
  if (props.date === '2023-01') {
    occupancy = '23.5%'
    total = '515'
  } else {
    occupancy = '26%'
  }

  return (
    <div className={styles.monthly_breakdown_container}>
        <div className={styles.mb_annual_revenue_container}>
            <div className={styles.mb_ar_title}>Projected Monthly Revenue</div>
            <div className={styles.mb_ar_data}> +${total || props.total}.00</div>
        </div>
        <div className={styles.mb_occupancy_percentage_container}>
            <div className={styles.mb_op_title}> Occupancy %</div>
            <div className={styles.mb_op_data}>{ props.occupency || occupancy}</div>
        </div>
    </div>
  )
}