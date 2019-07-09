import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import HWCamera from './components/Camera';



export default class Mainfile extends Component {
    constructor() {
        super();
        this.state = {
            images: [],
            Camera: false,
            currentPreviewId: '',
            preview: false,
        }
        this.addImage = this.addImage.bind(this);
        this.editImageInArray = this.editImageInArray.bind(this);
        this.galleryItems = this.galleryItems.bind(this);
    }

    addImage(picture) {
        let { images } = this.state;
        images.push(picture)
        this.setState({ Camera: false, images: images })
    }

    editImageInArray(picture, id) {
        const { images } = this.state;
        images[id] = picture;
        this.setState({ Camera: false, preview: false, currentPreviewId: '', images: images })

    }

    deleteImage() {
        const { images, currentPreviewId } = this.state;
        images.splice(currentPreviewId, 1);
        this.setState({ preview: false, images: images, currentPreviewId: '' })
    }
    galleryItems() {
        this.setState({ Camera: false })
    }
    render() {
        return (
            this.state.preview ?
                <View style={styles.container}>
                    <Image
                        source={{ uri: this.state.images[this.state.currentPreviewId] }}
                        style={{ flex: 1 }}
                    />
                    <View style={{ flex: 0.25, flexDirection: 'row-reverse', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'black' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { this.setState({ currentPreviewId: '', preview: false }) }}>
                                <Image
                                    source={require('../Images/cancle.png')}
                                    style={{ width: 50, height: 50 }}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: 'white' }}>Cancle</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { this.setState({ preview: false, Camera: true }) }}>
                                <Image
                                    source={require('../Images/edit.png')}
                                    style={{ width: 50, height: 50 }}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: 'white' }}> Edit </Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { this.deleteImage() }}>
                                <Image
                                    source={require('../Images/dellet.png')}
                                    style={{ width: 50, height: 50 }}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: 'white' }}>Delete</Text>
                        </View>
                    </View>
                </View> :
                <View style={styles.container}>
                    {this.state.Camera === false ?
                        <View style={styles.gallery}>
                            {this.state.images.length === 0 ? <Text>No Images</Text> :

                                <View style={{ alignItems: 'center', flex: 1, flexDirection: 'column' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                                        {this.state.images.map((e, i) => {
                                            return (
                                                <TouchableOpacity onPress={() => { this.setState({ currentPreviewId: i, preview: true }) }} style={{ overflow: 'hidden', backgroundColor: 'black', width: 100, height: 100, borderWidth: 2, margin: 2, borderRadius: 10 }} >
                                                    <Image
                                                        key={i}
                                                        source={{ uri: e }}
                                                        style={{ width: 100, height: 100 }}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                </View>
                            }
                            <TouchableOpacity onPress={() => { this.setState({ Camera: true }) }} style={styles.customBtn}>
                                <Text style={styles.fltBtnTxt}>+</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ flex: 1 }}>
                            <HWCamera galleryItems={this.galleryItems} addfunc={this.addImage} editfunc={this.editImageInArray} currentPreviewId={this.state.currentPreviewId} />
                        </View>
                    }
                </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gallery: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    fltBtnTxt: {
        fontSize: 50,
    textAlign: 'center',
    color: 'black',
    letterSpacing: 3,
    fontWeight: '500',
    textShadowColor: 'white',
    textShadowRadius: 25,
    },
    customBtn: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: 'grey',
        borderRadius: 30,
        elevation: 15
    }


})