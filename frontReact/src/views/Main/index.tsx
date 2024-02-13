import { ReactFlowProvider } from 'react-flow-renderer';
import 'reactflow/dist/style.css';
import './Main.scss';
import Sidebar from '../Sidebar';
import Flow from '../Flow';
import { NodeProvider } from '../Nodes/NodeContext';

const DynamicFlow = () => {
  return (
    <NodeProvider>
      <div className="dnd-flow">
        <ReactFlowProvider>
          <Flow />
          <Sidebar />
        </ReactFlowProvider>
      </div>
    </NodeProvider>
  );
};

export default DynamicFlow;
