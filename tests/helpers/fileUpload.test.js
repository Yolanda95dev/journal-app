import { describe, test, expect } from '@jest/globals'
import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from '../../src/helpers/fileUpload'

cloudinary.config({
    cloud_name: 'dcterbx3n',
    api_key: '989817622659918',
    api_secret: 'tU7hZSQKMiPYSeSqbs6BaDNUtSc',
    secure: true
})


describe('Tests in fileUpload', () => {

    test('should upload the file correctly to cloudinary', async () => {

        const imageUrl = 'https://res.cloudinary.com/jerrick/image/upload/v1707401113/65c4df99f485f6001d076160.jpg'
        const resp = await fetch(imageUrl)
        const blob = await resp.blob()
        const file = new File([blob], 'photo.jpg')


        const url = await fileUpload(file)
        expect(typeof url).toBe('string')

        // console.log(url)

        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')
        await cloudinary.api.delete_resources([imageId]);
        // console.log(cloudResp)
        // await cloudinary.api.delete_resources(['journal/' + imageId],{
        //     resource_type: 'image'
        // });

    })

    test('should return null', async () => {

        const file = new File([], 'photo.jpg')
        const url = await fileUpload(file)
        expect(url).toBe(null)

    })


})
