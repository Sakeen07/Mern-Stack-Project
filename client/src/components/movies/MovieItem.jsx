import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'

function MovieItem({title,releaseDate, posterUrl,id}) {
  return (
    <Card sx={{margin:2, width: 250, padding:1, borderRadius:5, ":hover":{
        boxShadow: "10px 10px 20px #ccc"
    }}}>
      <img className="h-96" width="100%" src={posterUrl} alt={title}/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth LinkComponent={Link} to={`/booking/${id}`} sx={{margin:"auto", bgcolor: "#2b2d42", ":hover":{
                    bgcolor:"#121217"
                }}} size="small">Book Now</Button>
      </CardActions>
    </Card>
  )
}

export default MovieItem