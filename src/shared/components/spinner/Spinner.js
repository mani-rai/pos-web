import CircularProgress from '@material-ui/core/CircularProgress'
import styles from './Spinner.module.css'

export default function Spinner (props) {

  return (
    <div className={styles.spinner_wrapper}>
      <CircularProgress
        variant="determinate"
        className={styles.bottom}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={styles.top}
        classes={{
          circle: styles.circle,
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </div>
  )
}
