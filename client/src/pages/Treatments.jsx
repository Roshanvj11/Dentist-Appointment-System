import React from 'react'
import './Treatments.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import DentalImplant from '../Treatments/Dental Implant.jpeg'
import InvisibleBraces from '../Treatments/Invisible braces.jpg'
import TeethFillings from '../Treatments/Teeth Fillings.jpeg'
import RootCanalTreatment from '../Treatments/Root canal Treatment.jpg'
import TeethRemoval from '../Treatments/Teeth Removal.jpeg'
import DentalBridges from '../Treatments/Dental bridges.jpeg'
import TeethWhitening from '../Treatments/Teeth Whitening.jpeg'
import DentalAligners from '../Treatments/Dental Aligners.jpeg'
import KidsDentistry from '../Treatments/Kids Dentistry.jpeg'


export default function Treatments() {
    return (
        <div>
            <div className="headingTreatment">
                <h1>Treatments</h1>
            </div>

            <div className="treatmentList">

                <div className="list">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={DentalImplant}
                            title="Dental Implant"
                        />
                        <CardContent>
                            <Typography className='listTypography' gutterBottom variant="h5" component="div">
                                Dental Implant
                            </Typography>
                            <Typography className='listTypography' sx={{ height: 200 }}

                                variant="body2"  >
                                A dental implant is like a sturdy metal screw placed into your jawbone where a tooth is missing. It acts as a new root for a replacement tooth to be attached securely. Once healed, it looks and functions just like a natural tooth.
                            </Typography>
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                    </Card>
                </div>

                <div className="list">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={InvisibleBraces}
                            title="Invisible braces"
                        />
                        <CardContent>
                            <Typography  className='listTypography' gutterBottom variant="h5" component="div">
                            Invisible braces
                            </Typography>
                            <Typography className='listTypography' sx={{ height: 200 }}
                            variant="body2" >
                                Invisible braces are clear plastic trays that gradually straighten your teeth without metal wires. They're nearly invisible when worn and can be easily removed for eating and cleaning. They're a discreet way to achieve a straighter smile.
                            </Typography>
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                    </Card>
                </div>

                <div className="list">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={TeethFillings}
                            title="Teeth Fillings"
                        />
                        <CardContent>
                            <Typography className='listTypography' gutterBottom variant="h5" component="div">
                                Teeth Fillings
                            </Typography>
                            <Typography className='listTypography' sx={{ height: 200 }}
                            variant="body2" >
                                Teeth fillings are materials used by dentists to repair cavities or damaged parts of teeth. They can be made of materials like composite resin or amalgam. The filling is placed into the affected area of the tooth, restoring its shape and function while preventing further decay.
                            </Typography>
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                    </Card>
                </div>

                <div className="list">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={RootCanalTreatment}
                            title="Root canal Treatment "
                        />
                        <CardContent>
                            <Typography className='listTypography' gutterBottom variant="h5" component="div">
                                Root canal Treatment                            </Typography>
                            <Typography  className='listTypography' sx={{ height: 200 }}
                            variant="body2" >
                                Root canal treatment is a dental procedure to fix a tooth with severe decay or infection. The dentist removes the infected pulp inside the tooth, cleans the area, and seals it to prevent further damage. This saves the tooth from extraction and relieves pain, restoring oral health.
                            </Typography>
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                    </Card>
                </div>

                <div className="list">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={TeethRemoval}
                            title="Teeth Removal"
                        />
                        <CardContent>
                            <Typography className='listTypography' gutterBottom variant="h5" component="div">
                                Teeth Removal
                            </Typography>
                            <Typography className='listTypography' sx={{ height: 200 }}
                            variant="body2" >
                                Teeth removal, also known as tooth extraction, is when a dentist removes a tooth from its socket in the jawbone. This is usually done if the tooth is severely damaged, decayed, or causing other dental problems. The area is numbed before the procedure, and sometimes sedation is used to make the patient more comfortable.
                            </Typography>
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                    </Card>
                </div>

                <div className="list">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={DentalBridges}
                            title="Dental bridges"
                        />
                        <CardContent>
                            <Typography className='listTypography' gutterBottom variant="h5" component="div">
                                Dental bridges
                            </Typography>
                            <Typography className='listTypography' sx={{ height: 200 }}
                            variant="body2" >
                                Dental bridges are fixed prosthetics used to replace missing teeth, restoring both function and appearance. They consist of artificial teeth anchored to neighboring natural teeth or dental implants. Bridges help improve chewing ability, maintain facial structure, and enhance your smile.
                            </Typography>
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                    </Card>
                </div>

                <div className="list">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={TeethWhitening}
                            title="Teeth Whitening"
                        />
                        <CardContent>
                            <Typography className='listTypography' gutterBottom variant="h5" component="div">
                                Teeth Whitening
                            </Typography>
                            <Typography  className='listTypography'
                            sx={{ height: 200 }}variant="body2" >
                                Teeth whitening is a cosmetic dental procedure that lightens the color of your teeth. It involves the use of bleaching agents to remove stains and discoloration caused by factors like food, drinks, smoking, or aging. The result is a brighter, whiter smile that can boost confidence and improve overall appearance.                            </Typography>
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                    </Card>
                </div>

                <div className="list">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={DentalAligners}
                            title="Dental Aligners"
                        />
                        <CardContent>
                            <Typography className='listTypography' gutterBottom variant="h5" component="div">
                                Dental Aligners
                            </Typography>
                            <Typography className='listTypography' sx={{ height: 200 }}
                            variant="body2" >
                                Dental aligners are custom-made, clear plastic trays used to straighten teeth without traditional braces. They gradually shift teeth into the desired position through gentle pressure. Aligners are removable, making eating and cleaning easier,
                                 and they're nearly invisible when worn, offering a discreet way to improve your smile.                           
                                  </Typography>
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                    </Card>
                </div>

                <div className="list">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={KidsDentistry}
                            title="Kids Dentistry"
                        />
                        <CardContent>
                            <Typography className='listTypography' gutterBottom variant="h5" component="div">
                                Kids Dentistry
                            </Typography>
                            <Typography  className='listTypography' sx={{ height: 200 }}
                            variant="body2" >
                                Kids dentistry focuses on the dental care of children, catering to their unique needs and ensuring healthy oral development. It includes regular check-ups, preventive care like cleanings and fluoride treatments, and treatments for common issues like cavities or misalignment. 
                            </Typography>
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                    </Card>
                </div>

                {/* <div className="list">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image=""
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Treatment10
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </div>

                <div className="list">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image=""
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Treatment11
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </div>

                <div className="list">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image=""
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Treatment12
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </div> */}

            </div>


        </div>
    )
}
