import { Icon } from './renderers/components/atoms/icons/Icon'
import { Typography } from './renderers/components/atoms/typographies/Typography'

function App() {

  return (
    <div>
      <Typography.Heading1>This is a test</Typography.Heading1>
      <Icon icon="AdminIcon" className="size-4 fill-gray-900" />
    </div>
  )
}

export default App
