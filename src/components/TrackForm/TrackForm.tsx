import {
  VStack,
  Input,
  useToast,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Select,
  RadioGroup,
  HStack,
  Radio,
  FormHelperText,
  Stack,
  Divider,
  Text,
  Switch,
  CheckboxGroup,
  Checkbox,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AlertInfo from "../AlertInfo/AltertInfo";

const TrackForm = (): JSX.Element => {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("refuge", data.refuge);
    formData.append("difficulty", data.difficulty);
    formData.append("kids", data.kids);
    formData.append("seasons", data.seasons);
    formData.append("description", data.description);
    formData.append("user", "6228d9e2d3b484d4871608ee");
    formData.append("image", data.image[0]);
    formData.append("gpx", data.image[0]);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TRACKS_API_URL}tracks/new`,
      {
        method: "POST",
        body: formData,
      }
    );
    const responseServer = await response.json();
    if (response.ok) {
      toast({
        title: "Track CREATED!",
        description: responseServer.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      reset();
    } else {
      toast({
        title: "ERROR creating track!",
        description: responseServer.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <FormControl isRequired mb={3}>
        <FormLabel htmlFor="name">track name</FormLabel>
        <Input
          id="name"
          variant="filled"
          type="text"
          placeholder="tip: add the names of departure and arrival spots"
          {...register("name", {
            required: "Please enter a track name",
            minLength: {
              value: 8,
              message: "Track name is too short, be original!",
            },
            maxLength: {
              value: 90,
              message: "Too long! Too much to climb!",
            },
          })}
        />
        {errors.name && <AlertInfo title={errors.name.message} />}
      </FormControl>
      <Stack
        direction={["column", null, "row"]}
        spacing="24px"
        w={"full"}
        mb={3}
      >
        <FormControl isRequired>
          <FormLabel htmlFor="refuge">refuge of departure</FormLabel>
          <Select
            id="refuge"
            variant="filled"
            placeholder="select one..."
            {...register("refuge", {
              required: "you have to select a refuge",
            })}
          >
            <option value="mallafre">Refugi Ernest Mallafré</option>
            <option value="gerdar">Refugi del Gerdar</option>
            <option value="amitges">Refugi d&apos;Amitges</option>
            <option value="jmblanc">Refugi Josep Maria Blanc</option>
            <option value="colomers">Refugi de Colomèrs</option>
            <option value="colomina">Refugi Colomina</option>
            <option value="saboredo">Refugi de Saboredo</option>
            <option value="restanca">Refugi de Restanca</option>
            <option value="ventosa">Refugi de Ventosa i Calvell</option>
            <option value="pla">Refugi del Pla</option>
          </Select>
          {errors.refuge && <AlertInfo title={errors.refuge.message} />}
        </FormControl>
        <FormControl
          isRequired
          {...register("difficulty", {
            required: "you have to select a level of difficulty",
          })}
        >
          <FormLabel htmlFor="difficulty">track difficulty</FormLabel>
          <RadioGroup id="difficulty">
            <HStack spacing="24px">
              <Radio
                value="low"
                colorScheme="green"
                {...register("difficulty")}
              >
                low
              </Radio>
              <Radio
                value="normal"
                colorScheme="yellow"
                {...register("difficulty")}
              >
                normal
              </Radio>
              <Radio value="high" colorScheme="red" {...register("difficulty")}>
                high
              </Radio>
            </HStack>
          </RadioGroup>
          <FormHelperText>
            Be honest, please! Show respect to the Mountains
          </FormHelperText>
          {errors.difficulty && <AlertInfo title={errors.difficulty.message} />}
        </FormControl>
      </Stack>
      <FormControl display="flex" alignItems="center" mb={3}>
        <FormLabel htmlFor="kidsswitch" mb="0">
          Kids friendly
        </FormLabel>
        <Switch id="kidsswitch" colorScheme="pink" {...register("kids")} />
      </FormControl>
      <FormControl
        as="fieldset"
        isRequired
        mb={3}
        {...register("seasons", {
          required: "you have to select at least one season",
        })}
      >
        <FormLabel as="legend">recommended seasons</FormLabel>
        <CheckboxGroup colorScheme="green">
          <HStack spacing={4}>
            <Checkbox value="spring" {...register("seasons")}>
              spring
            </Checkbox>
            <Checkbox value="summer" {...register("seasons")}>
              summer
            </Checkbox>
            <Checkbox value="autumn" {...register("seasons")}>
              autumn
            </Checkbox>
            <Checkbox value="winter" {...register("seasons")}>
              winter
            </Checkbox>
          </HStack>
        </CheckboxGroup>
        {errors.seasons && <AlertInfo title={errors.seasons.message} />}
      </FormControl>
      <FormControl isRequired mb={3}>
        <FormLabel htmlFor="description">description</FormLabel>
        <Textarea
          id="description"
          placeholder="decribe here your track (main waypoints, difficulties, must see spots...)"
          resize="vertical"
          variant="filled"
          h={120}
          {...register("description", {
            required: "Please enter a track description",
            minLength: {
              value: 60,
              message: "Track description is too short, be original!",
            },
            maxLength: {
              value: 2000,
              message: "Too long! Leave some surpises to other hikkers!",
            },
          })}
        />
        {errors.description && <AlertInfo title={errors.description.message} />}
      </FormControl>
      <FormControl isRequired mb={3}>
        <FormLabel htmlFor="image">cover image</FormLabel>
        <Input
          id="image"
          name="image"
          variant="filled"
          type="file"
          placeholder="choose a nice picture..."
          {...register("image", {
            required: "Please upload image file",
          })}
        />
        {errors.image && <AlertInfo title={errors.image.message} />}
      </FormControl>

      <Text fontSize="md">
        form in development....(submit does nothing, validation name and refuge
        OK. TODO: add icons difficulty as SVG. Add Kids switch true/false // add
        textarea description // add fileUpload image and GPX file)
      </Text>
      <Center>
        <Button
          borderRadius="md"
          colorScheme="green"
          type="submit"
          isLoading={isSubmitting}
          loadingText="Creating track..."
        >
          Add new track
        </Button>
      </Center>
    </form>
  );
};

export default TrackForm;
