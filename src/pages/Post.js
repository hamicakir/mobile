import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import SocialButtons from '../components/SocialButtons';
import ShareButton from '../components/ShareButton';
import Content from '../components/Content';
import Tag from '../components/Tag';
import Apply from '../components/Apply';
import CompanyImage from '../components/CompanyImage';
import timeSince from '../helpers/timeSince';

function Post({route}) {
  const data = route.params.data;
  function renderTags() {
    return (
      <>
        {data.tags.length ? (
          <View style={styles.tags}>
            {data.tags.map(tag => (
              <Tag
                name={tag.name}
                key={data.slug + '-' + tag.slug + '-detail'}
                type="tag"
                tagStyle={styles.tag}
                tagTextStyle={styles.tagText}
              />
            ))}
          </View>
        ) : null}
      </>
    );
  }
  return (
    <View style={styles.container}>
      <Header
        title={data.position}
        button={<ShareButton url={data.post_url} />}
      />
      <ScrollView style={styles.container}>
        <View style={styles.company}>
          <CompanyImage
            style={styles.image}
            uri={data.company.logo}
            width={48}
            height={48}
          />
          <View style={styles.companyDetails}>
            <Text style={styles.companyName} numberOfLines={1}>
              {data.company.name}
            </Text>
            <Text style={styles.postTitle}>{data.position}</Text>
          </View>
        </View>
        <Content style={{width: '100%', marginVertical: 25}} content={data.description} />
        <View style={styles.card}>
          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <Icon name="calendar" color="#26ae61" size={18} />
              <Text style={styles.itemHeaderText}>Son Güncelleme:</Text>
            </View>
            <Text style={styles.itemContent}>
              {timeSince(data.updated_at)} önce
            </Text>
          </View>
          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <Icon name="user" color="#26ae61" size={18} />
              <Text style={styles.itemHeaderText}>Pozisyon:</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.itemContent}>{data.position}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <Icon name="map-pin" color="#26ae61" size={18} />
              <Text style={styles.itemHeaderText}>Lokasyon:</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.itemContent}>{data.location}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <Icon name="bookmark" color="#26ae61" size={18} />
              <Text style={styles.itemHeaderText}>Etiketler:</Text>
            </View>
            <View style={{flex: 1}}>{renderTags()}</View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <Icon name="share-2" color="#26ae61" size={18} />
              <Text style={styles.itemHeaderText}>Bağlantılar:</Text>
            </View>
            <View style={{flex: 1}}>
              <SocialButtons />
            </View>
          </View>
        </View>
        <Apply
          email={data.apply_email}
          url={data.apply_url}
          position={data.position}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  company: {
    backgroundColor: '#FFF',
    width: '100%',
    paddingHorizontal: '5%',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 48,
    height: 48,
  },
  companyDetails: {
    marginLeft: 25,
  },
  companyName: {
    color: '#333',
    fontSize: 17,
    marginBottom: 4,
  },
  postTitle: {
    color: '#555',
    fontSize: 14,
  },
  card: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  itemHeaderText: {
    color: '#1d9b54',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  itemContent: {
    color: '#333',
    fontSize: 14,
  },
  tags: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: -10,
  },
  tag: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginBottom: 0,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 13,
  },
});

export default Post;
