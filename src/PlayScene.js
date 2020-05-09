'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroBox,
  ViroMaterials,
  ViroARCamera,
  ViroOmniLight,
  ViroImage,
  ViroARPlane,
  ViroAnimations,
  Viro360Video,
  Viro360Image,
  ViroUtils,
  ViroPortal,
  ViroPortalScene,
  ViroDirectionalLight,
  ViroQuad,
  ViroNode,
  ViroParticleEmitter
} from 'react-viro';

// import model from './model.obj';


export default class PlayScene extends Component {

  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroOmniLight
          intensity={300}
          position={[-10, 10, 10]}
          color={"#FFFFFF"}
          attenuationStartDistance={0}
          attenuationEndDistance={20} />
        <ViroOmniLight
          intensity={300}
          position={[10, -10, 10]}
          color={"#FFFFFF"}
          attenuationStartDistance={0}
          attenuationEndDistance={20} />
        <ViroOmniLight
          intensity={300}
          position={[10, -10, 10]}
          color={"#FFFFFF"}
          attenuationStartDistance={0}
          attenuationEndDistance={20} />
        <ViroOmniLight
          intensity={300}
          position={[-10, -10, 10]}
          color={"#FFFFFF"}
          attenuationStartDistance={0}
          attenuationEndDistance={20} />
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        {/* <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} /> */}
        <ViroAmbientLight color="#ffffff" intensity={200}/>
        {/* <ViroSpotLight position={[0, -0.25, 0]}
          color="#777777"
          direction={[0, 0, -1]}
          attenuationStartDistance={5}
          attenuationEndDistance={10}
          innerAngle={5}
          outerAngle={20}
        castsShadow={true} /> */}
        {/* <Viro3DObject
          source={require('./model.obj')}
          resources={[require('./materials.mtl')]}
          highAccuracyEvents={true}
          position={[0, -0.3, -0.7]} // we place the object in front of us (z = -1)
          scale={[0.5, 0.5, 0.5]} // we reduce the size of our Marmelab logo object
          type="OBJ"
        /> */}
        <ViroARPlane alignment={"Horizontal"}>

          {/* <ViroSpotLight
            innerAngle={5}
            outerAngle={25}
            direction={[0, -1, -.2]}
            position={[0, 3, 1]}
            color="#ffffff"
            castsShadow={true}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
          shadowOpacity={.7} /> */}


          <ViroNode position={[0, 0, 0]} dragType="FixedToWorld" onDrag={()=>{}}>
            <ViroImage
              height={0.75}
              width={0.75}
              position={[0, 0, 0]} // we place the object in front of us (z = -1)
              rotation={[-90, 0, 0]}
              placeholderSource={require("./image_placeholder.png")}
              source={require("./0-1.png")}
              animation={{name: "rotate", run: true, loop: false, delay: 7500,}}
            />
          </ViroNode>
        </ViroARPlane>
        <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={()=>{}}>
          <ViroPortal position={[-1, 0, 0]} rotation={[0, 90, 0]} scale={[.1, .1, .1]}>
            <Viro3DObject source={require('./portal_ship/portal_ship.vrx')}
              resources={[require('./portal_ship/portal_ship_diffuse.png'),
                require('./portal_ship/portal_ship_normal.png'),
                require('./portal_ship/portal_ship_specular.png')]}
            type="VRX"/>
          </ViroPortal>
          <Viro360Image source={require("./360_space.jpg")} />
        </ViroPortalScene>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : ""
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateX: "+=45",
      positionY: ".1"
    },
    duration: 5000, //.25 seconds

  },
});

module.exports = PlayScene;


// import React from 'react';
//
// import {
//     ViroARScene,
//     Viro3DObject,
//     ViroAmbientLight
// } from 'react-viro';
//
// const Diamond = () => (
//     <Viro3DObject
//       source={require('./emoji_smile.vrx')}
//       highAccuracyEvents={true}
//       position={[0, 0, -1]} // we place the object in front of us (z = -1)
//       scale={[0.5, 0.5, 0.5]} // we reduce the size of our Marmelab logo object
//       type="VRX"
//     />
// );
//
// const PlayScene = () => (
//     <ViroARScene displayPointCloud>
//       <ViroAmbientLight color="#fff" />
//       <Diamond />
//     </ViroARScene>
// );
//
// export default PlayScene;
