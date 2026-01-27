import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Paper,
  Slider,
  Typography,
  Button,
  IconButton,
  Fab,
  Container,
  Stack,
  Chip,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';

/**
 * Newton's Third Law Interactive Simulation - Final Version
 * With proper layout: lightbulb, key concept, and bottom controls
 */

const NewtonThirdLawSimulation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLightbulb, setShowLightbulb] = useState(true);
  const [showKeyConcept, setShowKeyConcept] = useState(true);

  const handleNext = () => {
    if (currentSlide < 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#fafafa' }}>
      {/* Header - Blue with Tabs like sample */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          py: 2.5,
          px: 4,
          boxShadow: '0 2px 8px rgba(37, 99, 235, 0.15)',
          zIndex: 10,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box 
              sx={{ 
                width: 40, 
                height: 40, 
                borderRadius: 2, 
                bgcolor: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ScienceOutlinedIcon sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: 'white',
                letterSpacing: '-0.02em',
                fontSize: '1.5rem'
              }}
            >
              Newton's 3rd Law Lab
            </Typography>
          </Stack>
          
          <Stack direction="row" spacing={1}>
            <Chip 
              label="Example 1: Contact Force" 
              sx={{ 
                bgcolor: currentSlide === 0 ? 'white' : 'rgba(255,255,255,0.2)',
                color: currentSlide === 0 ? '#2563eb' : 'white',
                fontWeight: 600,
                fontSize: '0.813rem',
                cursor: 'pointer',
                '&:hover': { bgcolor: currentSlide === 0 ? 'white' : 'rgba(255,255,255,0.3)' }
              }}
              onClick={() => setCurrentSlide(0)}
            />
            <Chip 
              label="Example 2: Non-contact Force" 
              sx={{ 
                bgcolor: currentSlide === 1 ? 'white' : 'rgba(255,255,255,0.2)',
                color: currentSlide === 1 ? '#2563eb' : 'white',
                fontWeight: 600,
                fontSize: '0.813rem',
                cursor: 'pointer',
                '&:hover': { bgcolor: currentSlide === 1 ? 'white' : 'rgba(255,255,255,0.3)' }
              }}
              onClick={() => setCurrentSlide(1)}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Slides Container */}
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Slide 1: Hammer and Nail */}
          <Box sx={{ minWidth: '100%', height: '100%' }}>
            <HammerNailSimulation />
          </Box>

          {/* Slide 2: Earth and Moon */}
          <Box sx={{ minWidth: '100%', height: '100%' }}>
            <EarthMoonSimulation />
          </Box>
        </Box>

        {/* Navigation Buttons */}
        {currentSlide > 0 && (
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: 24,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(107, 114, 128, 0.9)',
              color: 'white',
              boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
              width: 56,
              height: 56,
              '&:hover': { 
                bgcolor: 'rgba(75, 85, 99, 0.95)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              },
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: 32 }} />
          </IconButton>
        )}

        {currentSlide < 1 && (
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 24,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(229, 231, 235, 0.9)',
              color: '#374151',
              boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
              width: 56,
              height: 56,
              '&:hover': { 
                bgcolor: 'rgba(209, 213, 219, 0.95)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              },
            }}
          >
            <ChevronRightIcon sx={{ fontSize: 32 }} />
          </IconButton>
        )}

        {/* Lightbulb Tip - Top Right */}
        {showLightbulb && (
          <Paper
            elevation={0}
            sx={{
              position: 'absolute',
              top: 24,
              right: 24,
              p: 2.5,
              bgcolor: 'rgba(254, 243, 199, 0.95)',
              borderRadius: 3,
              minWidth: 320,
              maxWidth: 360,
              border: '2px solid #fbbf24',
              boxShadow: '0 4px 20px rgba(251, 191, 36, 0.25)',
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Box sx={{ pt: 0.3 }}>
                <LightbulbIcon sx={{ color: '#f59e0b', fontSize: 32 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ color: '#92400e', lineHeight: 1.6, fontSize: '0.875rem', fontWeight: 500 }}>
                  {currentSlide === 0 
                    ? "Click \"Strike\" to start simulation. Adjust mass & velocity to observe"
                    : "Click \"Strike\" to start simulation. Adjust masses & distance"}
                </Typography>
              </Box>
              <IconButton 
                size="small" 
                onClick={() => setShowLightbulb(false)}
                sx={{ 
                  color: '#92400e',
                  mt: -1,
                  mr: -1,
                  '&:hover': { bgcolor: 'rgba(146, 64, 14, 0.1)' }
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Paper>
        )}

        {/* Reopen Lightbulb FAB */}
        {!showLightbulb && (
          <Fab
            size="medium"
            onClick={() => setShowLightbulb(true)}
            sx={{
              position: 'absolute',
              top: 24,
              right: 24,
              bgcolor: '#fbbf24',
              color: 'white',
              boxShadow: '0 4px 16px rgba(251, 191, 36, 0.35)',
              '&:hover': { 
                bgcolor: '#f59e0b',
                boxShadow: '0 6px 20px rgba(251, 191, 36, 0.45)',
              },
            }}
          >
            <LightbulbIcon />
          </Fab>
        )}

        {/* Key Concept - Bottom Right with proper z-index */}
        {showKeyConcept && (
          <Paper
            elevation={0}
            sx={{
              position: 'absolute',
              bottom: { xs: 200, sm: 200, md: 140 }, // Lebih tinggi dari controller
              right: 24,
              p: 3,
              bgcolor: 'white',
              borderRadius: 3,
              minWidth: { xs: 320, sm: 380 },
              maxWidth: 420,
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              zIndex: 5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight="700" sx={{ color: '#111827', fontSize: '1.125rem' }}>
                Key Concept
              </Typography>
              <IconButton
                size="small"
                onClick={() => setShowKeyConcept(false)}
                sx={{ 
                  color: '#9ca3af',
                  ml: 2,
                  '&:hover': { bgcolor: '#f3f4f6' }
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="subtitle1" fontWeight="700" sx={{ color: '#111827', mb: 1 }}>
              Newton's Third Law:
            </Typography>
            <Typography variant="body2" sx={{ color: '#374151', mb: 2, lineHeight: 1.6 }}>
              For every action, there is an equal and opposite reaction.
            </Typography>
            <Typography variant="subtitle2" fontWeight="700" sx={{ color: '#111827', mb: 1.5 }}>
              Three Key Points:
            </Typography>
            <Stack spacing={0.75}>
              <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.875rem' }}>
                • Forces always come in <strong>pairs</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.875rem' }}>
                • The two forces are <strong>equal in magnitude</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.875rem' }}>
                • The two forces act in <strong>opposite directions</strong>
              </Typography>
            </Stack>
          </Paper>
        )}

        {/* Reopen Key Concept FAB */}
        {!showKeyConcept && (
          <Fab
            variant="extended"
            onClick={() => setShowKeyConcept(true)}
            sx={{
              position: 'absolute',
              bottom: { xs: 200, sm: 200, md: 140 },
              right: 24,
              bgcolor: 'white',
              color: '#6b7280',
              fontWeight: 600,
              fontSize: '0.875rem',
              px: 2.5,
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
              zIndex: 5,
              '&:hover': { 
                bgcolor: '#f9fafb',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              },
            }}
          >
            <MenuBookIcon sx={{ mr: 1, fontSize: 20 }} />
            Key Concept
          </Fab>
        )}
      </Box>
    </Box>
  );
};

/* ========================================================================= */
/* SLIDE 1: HAMMER AND NAIL                                                 */
/* ========================================================================= */

const HammerNailSimulation: React.FC = () => {
  const [mass, setMass] = useState(6);
  const [velocity, setVelocity] = useState(6);
  const [isStriking, setIsStriking] = useState(false);
  const [forceValue, setForceValue] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const stateRef = useRef({
    hammerY: 100,
    nailY: 350, // Nail starts just touching ground surface
    phase: 'idle' as 'idle' | 'down' | 'contact' | 'up',
    contactTimer: 0,
    targetNailY: 350,
  });

  const GROUND_Y = 400;
  const NAIL_INITIAL_Y = 350; // Nail just touching ground

  const calculateForce = useCallback(() => {
    const contactTime = 0.01;
    const momentumChange = mass * velocity;
    const force = momentumChange / contactTime;
    return Math.round(force);
  }, [mass, velocity]);

  const handleStrike = () => {
    if (isStriking) return;
    setIsStriking(true);
    stateRef.current.phase = 'down';
  };

  const reset = () => {
    setIsStriking(false);
    setForceValue(0);
    stateRef.current = {
      hammerY: 100,
      nailY: NAIL_INITIAL_Y,
      phase: 'idle',
      contactTimer: 0,
      targetNailY: NAIL_INITIAL_Y,
    };
  };

  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    color: string,
    label: string
  ) => {
    const headLength = 15;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - headLength * Math.cos(angle - Math.PI / 6),
      toY - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      toX - headLength * Math.cos(angle + Math.PI / 6),
      toY - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();

    // Draw label
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = color;
    ctx.fillText(label, toX + 15, (fromY + toY) / 2);
  };

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const { width, height } = ctx.canvas;
      const state = stateRef.current;

      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = '#f9fafb';
      ctx.fillRect(0, 0, width, height);

      // Ground - brown long strip at bottom
      ctx.fillStyle = '#92400e';
      ctx.fillRect(0, GROUND_Y, width, height - GROUND_Y);

      // Ground pattern
      ctx.fillStyle = '#78350f';
      for (let i = 0; i < width; i += 40) {
        ctx.fillRect(i, GROUND_Y, 20, height - GROUND_Y);
      }

      const nailX = width / 2;
      const currentNailY = state.nailY;

      // Nail body - visible part above ground, with small part below
      ctx.fillStyle = '#6b7280';
      const nailVisibleHeight = GROUND_Y - currentNailY; // Visible part
      const nailBelowGround = 20; // Small part below ground
      ctx.fillRect(nailX - 4, currentNailY, 8, nailVisibleHeight + nailBelowGround);

      // Nail head - above ground
      ctx.fillStyle = '#4b5563';
      ctx.fillRect(nailX - 10, currentNailY, 20, 6);

      const targetY = currentNailY - 40;

      if (state.phase === 'down') {
        const speed = velocity * 2;
        state.hammerY += speed;

        if (state.hammerY >= targetY) {
          state.hammerY = targetY;
          state.phase = 'contact';
          state.contactTimer = 0;

          const force = calculateForce();
          setForceValue(force);

          const penetrationDepth = Math.min(30, force / 500);
          state.targetNailY = Math.min(GROUND_Y - 10, state.nailY + penetrationDepth);
        }
      } else if (state.phase === 'contact') {
        state.contactTimer++;

        if (state.nailY < state.targetNailY) {
          state.nailY += 2;
          state.hammerY += 2;
        }

        if (state.contactTimer > 180) {
          state.phase = 'up';
        }
      } else if (state.phase === 'up') {
        state.hammerY -= 5;

        if (state.hammerY <= 100) {
          state.hammerY = 100;
          state.phase = 'idle';
          setIsStriking(false);
        }
      }

      // Hammer head
      ctx.fillStyle = '#475569';
      ctx.fillRect(nailX - 35, state.hammerY, 70, 40);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.strokeRect(nailX - 35, state.hammerY, 70, 40);

      // Hammer handle
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(nailX - 6, state.hammerY - 90, 12, 90);

      // Force arrows during contact
      if (state.phase === 'contact') {
        const force = calculateForce();
        const arrowLength = Math.min(100, Math.max(40, force / 15));

        // Red arrow (force on nail) - F_H
        drawArrow(ctx, nailX + 50, currentNailY, nailX + 50, currentNailY + arrowLength, '#dc2626', 'F_H');

        // Blue arrow (force on hammer) - F_N
        drawArrow(ctx, nailX - 50, currentNailY, nailX - 50, currentNailY - arrowLength, '#2563eb', 'F_N');
      }
    },
    [velocity, calculateForce]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      draw(ctx);
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [draw]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', position: 'relative' }}>
      {/* Canvas Area - Fullscreen without gaps */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        bgcolor: '#e5e7eb',
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}>
        <canvas 
          ref={canvasRef} 
          width={1600} 
          height={600} 
          style={{ 
            width: '100%', 
            height: '100%',
            display: 'block'
          }} 
        />
      </Box>

      {/* Force Display Cards - Top Left (overlay on canvas) */}
      {forceValue > 0 && (
        <Box sx={{ 
          position: 'absolute', 
          top: 24, 
          left: 24, 
          display: 'flex', 
          gap: 2, 
          alignItems: 'center',
          zIndex: 2
        }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: 'white',
              borderRadius: 2,
              minWidth: 200,
              border: '1px solid #e5e7eb',
            }}
          >
            <Typography variant="caption" sx={{ display: 'block', color: '#6b7280', fontWeight: 600, mb: 0.5, textTransform: 'uppercase', fontSize: '0.688rem' }}>
              FORCE ON NAIL (ACTION)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Box sx={{ width: 20, height: 3, bgcolor: '#dc2626', borderRadius: 1 }} />
              <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                (F_H)
              </Typography>
            </Box>
            <Typography variant="h4" fontWeight="800" sx={{ color: '#dc2626', fontSize: '2rem' }}>
              {forceValue} <Typography component="span" variant="body2" sx={{ color: '#ef5350', fontWeight: 600 }}>N</Typography>
            </Typography>
          </Paper>

          <Box sx={{ 
            bgcolor: '#f3f4f6', 
            borderRadius: 1, 
            width: 32, 
            height: 32, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
          }}>
            <Typography variant="h6" fontWeight="700" sx={{ color: '#6b7280' }}>
              =
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: 'white',
              borderRadius: 2,
              minWidth: 200,
              border: '1px solid #e5e7eb',
            }}
          >
            <Typography variant="caption" sx={{ display: 'block', color: '#6b7280', fontWeight: 600, mb: 0.5, textTransform: 'uppercase', fontSize: '0.688rem' }}>
              FORCE ON HAMMER (REACTION)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Box sx={{ width: 20, height: 3, bgcolor: '#2563eb', borderRadius: 1 }} />
              <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                (F_N)
              </Typography>
            </Box>
            <Typography variant="h4" fontWeight="800" sx={{ color: '#2563eb', fontSize: '2rem' }}>
              {forceValue} <Typography component="span" variant="body2" sx={{ color: '#3b82f6', fontWeight: 600 }}>N</Typography>
            </Typography>
          </Paper>
        </Box>
      )}

      {/* Control Panel - Bottom with high z-index */}
      <Paper elevation={0} sx={{ 
        borderRadius: 0, 
        p: 2.5, 
        bgcolor: 'white', 
        borderTop: '1px solid #e5e7eb',
        zIndex: 10 // Higher than key concept
      }}>
        <Container maxWidth="xl">
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={{ xs: 2, md: 3 }} 
            alignItems={{ xs: 'stretch', md: 'center' }}
          >
            {/* Hammer Mass Slider */}
            <Box sx={{ flex: 1, maxWidth: { md: 400 } }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" fontWeight="500" sx={{ color: '#111827', minWidth: 100 }}>
                  Hammer Mass
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <Slider
                    value={mass}
                    onChange={(_, value) => setMass(value as number)}
                    min={1}
                    max={10}
                    disabled={isStriking}
                    sx={{ 
                      '& .MuiSlider-thumb': { 
                        width: 20, 
                        height: 20,
                        bgcolor: '#2563eb',
                        '&:hover': {
                          boxShadow: '0 0 0 8px rgba(37, 99, 235, 0.16)',
                        }
                      },
                      '& .MuiSlider-track': {
                        height: 4,
                        bgcolor: '#2563eb',
                        border: 'none'
                      },
                      '& .MuiSlider-rail': {
                        height: 4,
                        bgcolor: '#cbd5e1',
                        opacity: 1
                      }
                    }}
                  />
                </Box>
                <Chip 
                  label={`${mass} kg`} 
                  size="small"
                  sx={{ 
                    bgcolor: '#dbeafe',
                    color: '#1e40af',
                    fontWeight: 700,
                    minWidth: 60,
                    fontSize: '0.875rem'
                  }}
                />
              </Stack>
            </Box>

            {/* Swing Velocity Slider */}
            <Box sx={{ flex: 1, maxWidth: { md: 400 } }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" fontWeight="500" sx={{ color: '#111827', minWidth: 100 }}>
                  Swing Velocity
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <Slider
                    value={velocity}
                    onChange={(_, value) => setVelocity(value as number)}
                    min={1}
                    max={10}
                    disabled={isStriking}
                    sx={{ 
                      '& .MuiSlider-thumb': { 
                        width: 20, 
                        height: 20,
                        bgcolor: '#2563eb',
                        '&:hover': {
                          boxShadow: '0 0 0 8px rgba(37, 99, 235, 0.16)',
                        }
                      },
                      '& .MuiSlider-track': {
                        height: 4,
                        bgcolor: '#2563eb',
                        border: 'none'
                      },
                      '& .MuiSlider-rail': {
                        height: 4,
                        bgcolor: '#cbd5e1',
                        opacity: 1
                      }
                    }}
                  />
                </Box>
                <Chip 
                  label={`${velocity} m/s`} 
                  size="small"
                  sx={{ 
                    bgcolor: '#dbeafe',
                    color: '#1e40af',
                    fontWeight: 700,
                    minWidth: 65,
                    fontSize: '0.875rem'
                  }}
                />
              </Stack>
            </Box>

            {/* Action Buttons */}
            <Stack direction="row" spacing={1.5} sx={{ minWidth: { md: 'auto' }, width: { xs: '100%', md: 'auto' } }}>
              <Button
                variant="contained"
                size="large"
                fullWidth={false}
                startIcon={<PlayArrowIcon />}
                onClick={handleStrike}
                disabled={isStriking}
                sx={{ 
                  py: 1.5,
                  px: { xs: 2, md: 3 },
                  fontWeight: 600,
                  fontSize: '0.938rem',
                  borderRadius: 2,
                  bgcolor: '#2563eb',
                  boxShadow: 'none',
                  textTransform: 'none',
                  flex: { xs: 1, md: 'initial' },
                  '&:hover': { 
                    bgcolor: '#1d4ed8',
                    boxShadow: 'none',
                  },
                  '&:disabled': {
                    bgcolor: '#e5e7eb',
                    color: '#9ca3af'
                  }
                }}
              >
                Strike
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<RestartAltIcon />}
                onClick={reset}
                sx={{ 
                  py: 1.5,
                  px: { xs: 2, md: 3 },
                  fontWeight: 500,
                  fontSize: '0.938rem',
                  borderRadius: 2,
                  borderColor: '#d1d5db',
                  color: '#6b7280',
                  textTransform: 'none',
                  minWidth: { xs: 'auto', md: 100 },
                  '&:hover': { 
                    borderColor: '#9ca3af',
                    bgcolor: '#f9fafb'
                  }
                }}
              >
                Reset
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Paper>
    </Box>
  );
};

/* ========================================================================= */
/* SLIDE 2: EARTH AND MOON                                                  */
/* ========================================================================= */

const EarthMoonSimulation: React.FC = () => {
  const [earthMass, setEarthMass] = useState(8);
  const [moonMass, setMoonMass] = useState(3);
  const [distance, setDistance] = useState(220);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const angleRef = useRef(0);

  const calculateGravity = useCallback(() => {
    const G = 100;
    const r = distance / 100;
    const force = (G * earthMass * moonMass) / (r * r);
    return Math.round(force);
  }, [earthMass, moonMass, distance]);

  const forceValue = calculateGravity();

  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    color: string,
    label: string
  ) => {
    const headLength = 16;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - headLength * Math.cos(angle - Math.PI / 6),
      toY - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      toX - headLength * Math.cos(angle + Math.PI / 6),
      toY - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();

    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = color;
    const offsetX = Math.cos(angle) * 30;
    const offsetY = Math.sin(angle) * 30;
    ctx.fillText(label, toX + offsetX, toY + offsetY);
  };

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const { width, height } = ctx.canvas;

      ctx.clearRect(0, 0, width, height);

      // Space background
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) / 2);
      gradient.addColorStop(0, '#1e293b');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      for (let i = 0; i < 120; i++) {
        const x = (i * 73) % width;
        const y = (i * 97) % height;
        const size = (i % 3) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      const centerX = width / 2;
      const centerY = height / 2;

      const earthRadius = 25 + earthMass * 3;
      const moonRadius = 12 + moonMass * 2;

      angleRef.current += 0.01 * (1 / (distance / 200));
      const moonX = centerX + Math.cos(angleRef.current) * distance;
      const moonY = centerY + Math.sin(angleRef.current) * distance;

      // Orbit path
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.setLineDash([8, 8]);
      ctx.lineWidth = 2;
      ctx.arc(centerX, centerY, distance, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Distance line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(moonX, moonY);
      ctx.stroke();

      // Force arrows
      const force = calculateGravity();
      const maxArrowLength = distance - earthRadius - moonRadius - 20;
      const arrowLength = Math.min(maxArrowLength, Math.max(35, force / 8));

      const angleToEarth = Math.atan2(centerY - moonY, centerX - moonX);
      drawArrow(
        ctx,
        moonX,
        moonY,
        moonX + Math.cos(angleToEarth) * arrowLength,
        moonY + Math.sin(angleToEarth) * arrowLength,
        '#dc2626',
        'F_E'
      );

      const angleToMoon = Math.atan2(moonY - centerY, moonX - centerX);
      drawArrow(
        ctx,
        centerX,
        centerY,
        centerX + Math.cos(angleToMoon) * arrowLength,
        centerY + Math.sin(angleToMoon) * arrowLength,
        '#2563eb',
        'F_M'
      );

      // Earth
      const earthGradient = ctx.createRadialGradient(centerX - 8, centerY - 8, 5, centerX, centerY, earthRadius);
      earthGradient.addColorStop(0, '#60a5fa');
      earthGradient.addColorStop(1, '#2563eb');
      ctx.fillStyle = earthGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.fill();

      // Earth glow
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(37, 99, 235, 0.5)';
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Moon
      const moonGradient = ctx.createRadialGradient(moonX - 4, moonY - 4, 3, moonX, moonY, moonRadius);
      moonGradient.addColorStop(0, '#e5e7eb');
      moonGradient.addColorStop(1, '#9ca3af');
      ctx.fillStyle = moonGradient;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Moon glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(156, 163, 175, 0.4)';
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;
    },
    [earthMass, moonMass, distance, calculateGravity]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      draw(ctx);
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [draw]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', position: 'relative' }}>
      {/* Canvas Area - Fullscreen without gaps */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        bgcolor: '#0f172a',
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}>
        <canvas 
          ref={canvasRef} 
          width={1600} 
          height={600} 
          style={{ 
            width: '100%', 
            height: '100%',
            display: 'block'
          }} 
        />
      </Box>

      {/* Force Display Cards - Top Left (overlay on canvas) */}
      <Box sx={{ 
        position: 'absolute', 
        top: 24, 
        left: 24, 
        display: 'flex', 
        gap: 2, 
        alignItems: 'center',
        zIndex: 2
      }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: 2,
            minWidth: 200,
            border: '1px solid rgba(220, 38, 38, 0.3)',
          }}
        >
          <Typography variant="caption" sx={{ display: 'block', color: '#fca5a5', fontWeight: 600, mb: 0.5, textTransform: 'uppercase', fontSize: '0.688rem' }}>
            FORCE ON MOON (F_E)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Box sx={{ width: 20, height: 3, bgcolor: '#dc2626', borderRadius: 1 }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
              (Action)
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: '#dc2626', fontSize: '2rem' }}>
            {forceValue} <Typography component="span" variant="body2" sx={{ color: '#ef5350', fontWeight: 600 }}>G</Typography>
          </Typography>
        </Paper>

        <Box sx={{ 
          bgcolor: 'rgba(46, 125, 50, 0.2)', 
          borderRadius: 1, 
          width: 32, 
          height: 32, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '1px solid rgba(102, 187, 106, 0.3)'
        }}>
          <Typography variant="h6" fontWeight="700" sx={{ color: '#66bb6a' }}>
            =
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: 2,
            minWidth: 200,
            border: '1px solid rgba(37, 99, 235, 0.3)',
          }}
        >
          <Typography variant="caption" sx={{ display: 'block', color: '#93c5fd', fontWeight: 600, mb: 0.5, textTransform: 'uppercase', fontSize: '0.688rem' }}>
            FORCE ON EARTH (F_M)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Box sx={{ width: 20, height: 3, bgcolor: '#2563eb', borderRadius: 1 }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
              (Reaction)
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: '#2563eb', fontSize: '2rem' }}>
            {forceValue} <Typography component="span" variant="body2" sx={{ color: '#3b82f6', fontWeight: 600 }}>G</Typography>
          </Typography>
        </Paper>
      </Box>

      {/* Control Panel - Bottom with high z-index */}
      <Paper elevation={0} sx={{ 
        borderRadius: 0, 
        p: 2.5, 
        bgcolor: 'white', 
        borderTop: '1px solid #e5e7eb',
        zIndex: 10
      }}>
        <Container maxWidth="xl">
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={{ xs: 2, md: 2.5 }} 
            alignItems={{ xs: 'stretch', md: 'center' }}
          >
            {/* Earth Mass Slider */}
            <Box sx={{ flex: 1, maxWidth: { md: 350 } }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" fontWeight="500" sx={{ color: '#111827', minWidth: 100 }}>
                  Earth Mass (M₁)
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <Slider
                    value={earthMass}
                    onChange={(_, value) => setEarthMass(value as number)}
                    min={1}
                    max={10}
                    sx={{ 
                      '& .MuiSlider-thumb': { 
                        width: 20, 
                        height: 20,
                        bgcolor: '#2563eb',
                        '&:hover': {
                          boxShadow: '0 0 0 8px rgba(37, 99, 235, 0.16)',
                        }
                      },
                      '& .MuiSlider-track': {
                        height: 4,
                        bgcolor: '#2563eb',
                        border: 'none'
                      },
                      '& .MuiSlider-rail': {
                        height: 4,
                        bgcolor: '#cbd5e1',
                        opacity: 1
                      }
                    }}
                  />
                </Box>
                <Chip 
                  label={`${earthMass}`} 
                  size="small"
                  sx={{ 
                    bgcolor: '#dbeafe',
                    color: '#1e40af',
                    fontWeight: 700,
                    minWidth: 45,
                    fontSize: '0.875rem'
                  }}
                />
              </Stack>
            </Box>

            {/* Moon Mass Slider */}
            <Box sx={{ flex: 1, maxWidth: { md: 350 } }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" fontWeight="500" sx={{ color: '#111827', minWidth: 100 }}>
                  Moon Mass (M₂)
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <Slider
                    value={moonMass}
                    onChange={(_, value) => setMoonMass(value as number)}
                    min={1}
                    max={10}
                    sx={{ 
                      '& .MuiSlider-thumb': { 
                        width: 20, 
                        height: 20,
                        bgcolor: '#2563eb',
                        '&:hover': {
                          boxShadow: '0 0 0 8px rgba(37, 99, 235, 0.16)',
                        }
                      },
                      '& .MuiSlider-track': {
                        height: 4,
                        bgcolor: '#2563eb',
                        border: 'none'
                      },
                      '& .MuiSlider-rail': {
                        height: 4,
                        bgcolor: '#cbd5e1',
                        opacity: 1
                      }
                    }}
                  />
                </Box>
                <Chip 
                  label={`${moonMass}`} 
                  size="small"
                  sx={{ 
                    bgcolor: '#dbeafe',
                    color: '#1e40af',
                    fontWeight: 700,
                    minWidth: 45,
                    fontSize: '0.875rem'
                  }}
                />
              </Stack>
            </Box>

            {/* Distance Slider */}
            <Box sx={{ flex: 1, maxWidth: { md: 350 } }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2" fontWeight="500" sx={{ color: '#111827', minWidth: 80 }}>
                  Distance (r)
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <Slider
                    value={distance}
                    onChange={(_, value) => setDistance(value as number)}
                    min={120}
                    max={350}
                    sx={{ 
                      '& .MuiSlider-thumb': { 
                        width: 20, 
                        height: 20,
                        bgcolor: '#2563eb',
                        '&:hover': {
                          boxShadow: '0 0 0 8px rgba(37, 99, 235, 0.16)',
                        }
                      },
                      '& .MuiSlider-track': {
                        height: 4,
                        bgcolor: '#2563eb',
                        border: 'none'
                      },
                      '& .MuiSlider-rail': {
                        height: 4,
                        bgcolor: '#cbd5e1',
                        opacity: 1
                      }
                    }}
                  />
                </Box>
                <Chip 
                  label={`${distance}`} 
                  size="small"
                  sx={{ 
                    bgcolor: '#dbeafe',
                    color: '#1e40af',
                    fontWeight: 700,
                    minWidth: 50,
                    fontSize: '0.875rem'
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Paper>
    </Box>
  );
};

export default NewtonThirdLawSimulation;
