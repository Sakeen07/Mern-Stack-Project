import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';



function Footer() {
  const styles = {
    footer: {
      backgroundColor: '#2d2d42',
      color: '#fff',
      textAlign: 'center',
      padding: '10px 0',
      bottom: 0,
      left: 0,
      width: '100%',
    },
    contactTitle: {
      fontSize: '14px',
      marginBottom: '10px',
    },
    contactContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '5px',
    },
    iconContainer: {
      marginRight: '20px',
    },
    icon: {
      marginRight: '10px',
      cursor: 'pointer',
    },
    textContainer: {
      textAlign: 'left',
    },
    line: {
      borderTop: '1px solid #fff',
      margin: '10px 0',
    },
    appText: {
      fontSize: '10px',
    },
  };

  return (
    <footer style={styles.footer}>
      <h2 style={styles.contactTitle}>Contact Us:</h2>
      <div style={styles.contactContainer}>
        <div style={styles.iconContainer}>
          <FacebookIcon size={30} style={styles.icon} />
          <LinkedInIcon size={30} style={styles.icon} />
          <YouTubeIcon size={30} style={styles.icon} />
          <InstagramIcon size={30} style={styles.icon} />
        </div>
        <div style={styles.textContainer}>
          <p><EmailIcon /> sakeenjaleel07@gmail.com</p>
          <p><CallIcon /> +94779799917</p>
        </div>
      </div>
      <div style={styles.line}></div>
      <p style={styles.appText}>This app created by using MERN stack</p>
    </footer>
  )
}



export default Footer
