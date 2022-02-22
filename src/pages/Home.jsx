import './home.css'
import Button from '@mui/material/Button'
import logo from './logo.svg'

// exported components

export const HomePage = () => {
  return (
    <div className="home">
      <header className="home-header">
        <img alt="logo" className="home-logo" src={logo} />

        <Button component="a" href="https://reactjs.org" rel="noreferrer noopener" target="_blank" variant="contained">
          Learn React
        </Button>
      </header>
    </div>
  )
}
