import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
}
    from 'react-native'
import React from 'react'




const postFooterIcons = [
    {
        name: 'Like',
        imageUrl: 'https://i.imgur.com/rSIaOKk.png',
        likedImageUrl: 'https://i.imgur.com/rSIaOKk.png'
    },
    {
        name: 'Comment',
        imageUrl: 'https://i.imgur.com/IpMjNyT.png',
    },
    {
        name: 'Share',
        imageUrl: 'https://i.imgur.com/73Xzapj.png'
    },
]

const Posts = ({ location }) => {
    return (
        <View style={{ marginBottom: 30 }}>
            <PostHeader location={location} />
            <PostImage location={location} />
            <View style={{ flexDirection: 'row', marginHorizontal: 15, marginTop: 15, }}>
                <PostFooter />
                <Likes location={location} />
            </View>
            <Caption location={location} />
            <CommentsSection location={location} />
            <Comments location={location} />
        </View>
    )
}

const PostHeader = ({ location }) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,
            alignItems: 'center',
            marginTop: 20,
        }}
    >

        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Image
                source={{ uri: location.profile_picture }}
                style={styles.story}
            />
            <Text style={{ color: 'black', marginLeft: 5, fontWeight: '700', }}>
                {location.user}
            </Text>
        </View>
        <Text style={{ color: 'black', fontWeight: '900' }}>...</Text>
    </View>
)

const PostImage = ({ location }) => (
    <View
        style={{
            width: 360,
            height: 450,
            borderRadius: 20,
        }}
    >
        <Image
            source={{ uri: location.imageUrl }}
            style={{ height: 450, resizeMode: 'cover', borderRadius: 10, }}
        />
    </View>

)

const PostFooter = () => (
    <View style={{ flexDirection: 'row' }}>
        <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl} />
        <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
        <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl} />
    </View>

)

const Icon = ({ imgStyle, imgUrl }) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{ uri: imgUrl }} />
    </TouchableOpacity>
)

const Likes = ({ location }) => (
    <Text style={{ color: 'black', fontWeight: '600', marginLeft: 160, marginTop: 10 }}>
        {location.credits} Likes
    </Text>
)

const Caption = ({ location }) => (
    <View style={{ marginLeft: 16, }}>
        <Text style={{ color: 'black' }}>
            <Text style={{ fontWeight: '900', color: '#387981' }}>{location.user} ::</Text>
            <Text> {location.caption}</Text>
        </Text>
    </View>
)

const CommentsSection = ({ location }) => (
    <View style={{ marginTop: 5, marginLeft: 18 }}>
        {!!location.comments.length && (
            <Text style={{ color: 'gray' }}>
                View{location.comments.length > 1 ? ' all' : ''} {location.comments.length}{' '}
                {location.comments.length > 1 ? 'comments' : 'comment'}
            </Text>
        )}
    </View>
)

const Comments = ({ location }) => (
    <>
        {location.comments.map((comment, index) => (
            <View key={index} style={{ flexDirection: 'row', marginTop: 5, }}>
                <Text style={{ color: 'black', marginLeft: 18 }}>
                    <Text style={{ fontWeight: '900' }}>{comment.user} -> </Text>{' '}
                    {comment.comment}
                </Text>
            </View>
        ))}
    </>
)

export default Posts

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        marginLeft: 6,
        borderWidth: 1.6,
        borderRadius: 50,
        borderColor: "#387981",
    },
    footerIcon: {
        width: 20,
        height: 20,
        margin: 10,
        marginLeft: 3,
    },

})