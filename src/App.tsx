import { Card } from './renderers/components/atoms/card/Card'
import { Icon } from './renderers/components/atoms/icons/Icon'
import { Typography } from './renderers/components/atoms/typographies/Typography'

function App() {

  return (
    <div>
      <Card size="lg">
      <Typography.Heading1>This is a test</Typography.Heading1>
      <Icon icon="AdminIcon" className="size-4 fill-brand-700" />
      </Card>

    </div>
  )
}

export default App
