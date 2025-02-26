import { Card } from './renderers/components/atoms/card/Card'
import { Icon } from './renderers/components/atoms/icons/Icon'
import { Typography } from './renderers/components/atoms/typographies/Typography'
import { Button } from './renderers/components/molecules/button/Button'

function App() {

  return (
    <div>
      <Card size="lg">
      <Typography.Heading1>This is a test</Typography.Heading1>
      <Icon icon="AdminIcon" className="size-4 fill-brand-700" />
      <Button>Click me</Button>
      </Card>

    </div>
  )
}

export default App
