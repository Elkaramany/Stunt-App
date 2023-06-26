import React from 'react'
import { View, TouchableOpacity, } from 'react-native'
import Modal from 'react-native-modal'
import { Container, Spinner, Text } from '@Components'
import { Performer } from '@RealmTypes'
import { Colors, GlobalStyles } from '@Config'
import { verticalScale } from 'react-native-size-matters'
import PDFContent from './PDF'
import { ShareIcon } from '@Assets'
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import { PDFDocument } from 'pdf-lib';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
//@ts-ignore
import base64 from 'base-64';


interface Props {
    isVisible: boolean
    setVisible: (val: boolean) => void
    item: Performer
}

const ModalPDF: React.FC<Props> = ({ isVisible, setVisible, item }) => {
    let ref = React.useRef()
    const closeModal = () => setVisible(false)
    const [showModal, setShowModal] = React.useState(false)

    async function captureViewAndShare(viewShotRef: any) {
        setShowModal(true) // Show the generating PDF modal
        try {
            // Capture the view as an image in PNG format
            //@ts-ignore
            const viewCapture = await ViewShot.captureRef(viewShotRef, {
                format: 'png',
                quality: 1,
            });

            // Fetch the image and create a PDF with the captured image
            const imageBase64 = await RNFS.readFile(viewCapture, 'base64');
            const binaryString = base64.decode(imageBase64);
            const arrayBuffer = new ArrayBuffer(binaryString.length);
            const uint8Array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < binaryString.length; i++) {
                uint8Array[i] = binaryString.charCodeAt(i);
            }

            const pdfDoc = await PDFDocument.create();
            const image = await pdfDoc.embedPng(uint8Array);
            const page = pdfDoc.addPage([image.width, image.height]);
            page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });

            // Save the PDF to the device's file system
            const pdfBytes = await pdfDoc.save();
            const filePath = `${RNFS.DocumentDirectoryPath}/${item.name}.pdf`;
            await RNFS.writeFile(filePath, Buffer.from(pdfBytes).toString('base64'), 'base64');

            // Share the PDF
            const shareOptions = {
                url: 'file://' + filePath,
                type: 'application/pdf',
                title: `${item.name}.pdf`,
            };
            await Share.open(shareOptions);
        } catch (error) {
            console.error('Error while capturing view and sharing PDF:', error);
        } finally {
            setShowModal(false) // Hide the generating PDF modal
        }
    }

    const GeneratingPDFModal = () => {
        return (
            <Modal
                isVisible={showModal}
                backdropOpacity={0.5}
                animationIn='fadeIn'
                animationOut='fadeOut'
                style={{ alignItems: 'center', justifyContent: 'center' }}
            >
                <View style={{ backgroundColor: Colors.primary, padding: 20, borderRadius: 10, flexDirection: 'row' }}>
                    <Text str='Generating PDF...' bigger style={{ fontWeight: '500' }} />
                    <Spinner />
                </View>
            </Modal>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Modal
                isVisible={isVisible}
                onBackdropPress={closeModal}
                onBackButtonPress={closeModal}
                style={{ margin: 0 }}
                backdropOpacity={0}
            >
                <Container bigContainerStyle={{ paddingTop: verticalScale(30) }}>
                    <ViewShot style={{ flex: 1 }} ref={ref}>
                        <PDFContent item={item} />
                    </ViewShot>

                    <View style={[GlobalStyles.rowAround, { marginVertical: verticalScale(15) }]}>
                        <TouchableOpacity onPress={() => captureViewAndShare(ref)}>
                            <ShareIcon fill={'red'} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={closeModal}>
                            <Text str='Done' bigger style={{ fontWeight: '500', color: Colors.tertiary }} />
                        </TouchableOpacity>
                    </View>

                </Container>
            </Modal>
            <GeneratingPDFModal />
        </View>

    );
}

export default ModalPDF