import { Button } from "../shared/Button"
import { Input } from "../shared/Input"

const ScoreForm = () => {
    return (
        <div>
            <h6>Add score</h6>
            <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Input placeHolder='Home Team' />
                    <Input placeHolder='Home Score' />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Input placeHolder='Away Team' />
                    <Input placeHolder='Away Score' />
                </div>
            </div>
            <Button text='Add' />
        </div>
    )
}

export default ScoreForm
