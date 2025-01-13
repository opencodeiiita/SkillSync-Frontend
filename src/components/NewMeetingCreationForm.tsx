import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';

const meetingSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title must be 50 characters or less"),
  description: z.string().max(300, "Description must be 300 characters or less").optional(),
  workspaceId: z.string().min(1, "Workspace is required"),
  dateTime: z.date().min(new Date(), "Date and time must be in the future"),
  duration: z.number().int().positive("Duration must be a positive number").optional(),
  link: z.string().url("Must be a valid URL").optional(),
  visibility: z.enum(["Public", "Private"]),
  additionalNotes: z.string().max(200, "Additional notes must be 200 characters or less").optional(),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color"),
});

type MeetingFormData = z.infer<typeof meetingSchema>;

interface NewMeetingCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onMeetingCreated: () => void;
  workspaces: { id: string; name: string }[];
}

const NewMeetingCreationForm: React.FC<NewMeetingCreationFormProps> = ({ isOpen, onClose, onMeetingCreated, workspaces }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewData, setPreviewData] = useState<Partial<MeetingFormData>>({});

  const { register, handleSubmit, control, watch, formState: { errors }, reset } = useForm<MeetingFormData>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      visibility: 'Public',
      color: '#1976d2',
    },
  });

  const watchedFields = watch();

  React.useEffect(() => {
    setPreviewData(watchedFields);
  }, [watchedFields]);

  const onSubmit = async (data: MeetingFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Replace with your actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      console.log('Meeting created:', data);
      onMeetingCreated();
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating meeting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Meeting</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <TextField
                {...register('title')}
                label="Meeting Title"
                fullWidth
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <TextField
                {...register('description')}
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Workspace</InputLabel>
                <Controller
                  name="workspaceId"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Workspace">
                      {workspaces.map((workspace) => (
                        <MenuItem key={workspace.id} value={workspace.id}>
                          {workspace.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  name="dateTime"
                  control={control}
                  render={({ field }) => (
                    <DateTimePicker
                      label="Date & Time"
                      {...field}
                      renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                  )}
                />
              </LocalizationProvider>
              <TextField
                {...register('duration', { valueAsNumber: true })}
                label="Duration (minutes)"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.duration}
                helperText={errors.duration?.message}
              />
              <TextField
                {...register('link')}
                label="Meeting Link"
                fullWidth
                margin="normal"
                error={!!errors.link}
                helperText={errors.link?.message}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Visibility</InputLabel>
                <Controller
                  name="visibility"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Visibility">
                      <MenuItem value="Public">Public</MenuItem>
                      <MenuItem value="Private">Private</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
              <TextField
                {...register('additionalNotes')}
                label="Additional Notes"
                fullWidth
                margin="normal"
                multiline
                rows={2}
                error={!!errors.additionalNotes}
                helperText={errors.additionalNotes?.message}
              />
              <TextField
                {...register('color')}
                label="Meeting Color"
                type="color"
                fullWidth
                margin="normal"
                error={!!errors.color}
                helperText={errors.color?.message}
              />
            </div>
            <div>
              <Typography variant="h6" gutterBottom>
                Meeting Preview
              </Typography>
              <AnimatePresence>
                {previewData.title && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      backgroundColor: '#f5f5f5',
                      padding: '16px',
                      borderRadius: '8px',
                      borderLeft: `4px solid ${previewData.color || '#1976d2'}`,
                    }}
                  >
                    <Typography variant="h6">{previewData.title}</Typography>
                    {previewData.description && (
                      <Typography variant="body2" color="textSecondary">
                        {previewData.description}
                      </Typography>
                    )}
                    {previewData.dateTime && (
                      <Typography variant="body2" style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                        <CalendarIcon size={16} style={{ marginRight: '4px' }} />
                        {format(previewData.dateTime, "PPP")}
                      </Typography>
                    )}
                    {previewData.duration && (
                      <Typography variant="body2" style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                        <Clock size={16} style={{ marginRight: '4px' }} />
                        Duration: {previewData.duration} minutes
                      </Typography>
                    )}
                    {previewData.visibility && (
                      <Typography variant="body2" style={{ marginTop: '4px' }}>
                        Visibility: {previewData.visibility}
                      </Typography>
                    )}
                    {previewData.link && (
                      <Typography variant="body2" style={{ marginTop: '4px' }}>
                        <a href={previewData.link} target="_blank" rel="noopener noreferrer">
                          Join Meeting
                        </a>
                      </Typography>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          variant="contained"
          style={{ backgroundColor: previewData.color }}
        >
          {isSubmitting ? 'Creating...' : 'Create Meeting'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewMeetingCreationForm;

