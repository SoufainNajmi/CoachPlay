import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import type { Group } from 'three';
class SceneBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}
function Track({still}: {still: boolean}) {
  const group = useRef<Group>(null);
  useFrame(({clock, pointer}) => { if (group.current && !still) { group.current.rotation.z = Math.sin(clock.elapsedTime * .18) * .08 - .4; group.current.rotation.y = pointer.x * .12; } });
  return <group ref={group} position={[3.2, -.8, 0]} rotation={[.4, -.2, -.4]}>{[0,1,2].map(i => <mesh key={i} scale={[1, 1.6, 1]}><torusGeometry args={[2.2 + i * .22, .012, 6, 72]}/><meshBasicMaterial color="#f34538" transparent opacity={.45 - i * .1}/></mesh>)}<mesh position={[2.2,0,0]}><sphereGeometry args={[.065, 12, 12]}/><meshBasicMaterial color="#ff5b49"/></mesh></group>;
}
export default function ThreeScene() {
  const reduced = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let intersecting = true;
    const update = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; update(); });
    if (container.current) observer.observe(container.current);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);
  return <div ref={container} className="three-scene" aria-hidden="true"><SceneBoundary><Canvas dpr={[1, 1.25]} camera={{position:[0,0,8], fov:45}} gl={{alpha:true, antialias:false, powerPreference:'low-power'}} frameloop={reduced || !visible ? 'demand' : 'always'}><Track still={!!reduced}/></Canvas></SceneBoundary></div>;
}
